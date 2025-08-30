import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { zip, unzip } from 'react-native-zip-archive';
import Realm, { BSON } from 'realm';
import Record from '@/db/schema/record';
import Archive from '@/db/schema/archive';

export interface BackupManifest {
  version: string;
  createdAt: string;
  recordCount: number;
  archiveCount: number;
  imageCount: number;
  imageMappings: { [oldPath: string]: string };
}

export interface BackupProgress {
  stage: 'compressing' | 'exporting' | 'zipping' | 'complete';
  current: number;
  total: number;
  message: string;
}

const BACKUP_VERSION = '1.0.0';
const BACKUP_EXTENSION = '.moli-backup';
const IMAGE_COMPRESSION_QUALITY = 0.8;

/**
 * Compress and copy image to backup directory
 */
async function compressImage(imagePath: string, backupImagesDir: string): Promise<string> {
  try {
    // Get original image info
    const imageInfo = await FileSystem.getInfoAsync(imagePath);
    if (!imageInfo.exists) {
      throw new Error(`Image not found: ${imagePath}`);
    }

    // Generate new filename
    const filename = imagePath.split('/').pop() || 'image.jpg';
    const compressedPath = `${backupImagesDir}/${filename}`;

    // Compress image
    const compressedImage = await ImageManipulator.manipulateAsync(
      imagePath,
      [], // No resize, just compress
      {
        compress: IMAGE_COMPRESSION_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    // Copy compressed image to backup directory
    await FileSystem.copyAsync({
      from: compressedImage.uri,
      to: compressedPath,
    });

    return filename;
  } catch (error) {
    console.error('Failed to compress image:', imagePath, error);
    throw error;
  }
}

/**
 * Export Realm database to JSON format
 */
function exportRealmData(realm: Realm): { records: any[], archives: any[] } {
  const records = realm.objects<Record>('Record').map(record => ({
    _id: record._id.toString(),
    date: record.date.toISOString(),
    imagePath: Array.from(record.imagePath),
    imageRatio: Array.from(record.imageRatio),
    body: record.body,
    archiveIds: record.archive.map(arch => arch._id.toString()),
  }));

  const archives = realm.objects<Archive>('Archive').map(archive => ({
    _id: archive._id.toString(),
    name: archive.name,
    lastDate: archive.lastDate?.toISOString(),
    count: archive.count,
    order: archive.order,
    show: archive.show,
    recordIds: archive.records.map(rec => rec._id.toString()),
  }));

  return { records, archives };
}

/**
 * Create backup file
 */
export async function createBackup(
  realm: Realm,
  onProgress?: (progress: BackupProgress) => void
): Promise<string> {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `moli-backup-${timestamp}`;
    
    // Create temporary directories
    const tempDir = `${FileSystem.cacheDirectory}backup-temp/`;
    const backupDir = `${tempDir}${backupName}/`;
    const backupImagesDir = `${backupDir}images/`;
    
    await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });
    await FileSystem.makeDirectoryAsync(backupDir, { intermediates: true });
    await FileSystem.makeDirectoryAsync(backupImagesDir, { intermediates: true });

    onProgress?.({
      stage: 'exporting',
      current: 0,
      total: 100,
      message: 'Exporting database...'
    });

    // Export database
    const { records, archives } = exportRealmData(realm);
    
    // Get all unique image paths
    const allImagePaths = [...new Set(records.flatMap(r => r.imagePath))];
    
    onProgress?.({
      stage: 'compressing',
      current: 0,
      total: allImagePaths.length,
      message: 'Compressing images...'
    });

    // Compress and copy images
    const imageMappings: { [oldPath: string]: string } = {};
    
    for (let i = 0; i < allImagePaths.length; i++) {
      const imagePath = allImagePaths[i];
      try {
        const newFilename = await compressImage(imagePath, backupImagesDir);
        imageMappings[imagePath] = newFilename;
        
        onProgress?.({
          stage: 'compressing',
          current: i + 1,
          total: allImagePaths.length,
          message: `Compressing image ${i + 1}/${allImagePaths.length}`
        });
      } catch (error) {
        console.warn('Failed to backup image:', imagePath, error);
        // Continue with other images
      }
    }

    // Create manifest
    const manifest: BackupManifest = {
      version: BACKUP_VERSION,
      createdAt: new Date().toISOString(),
      recordCount: records.length,
      archiveCount: archives.length,
      imageCount: Object.keys(imageMappings).length,
      imageMappings,
    };

    // Write files
    await FileSystem.writeAsStringAsync(
      `${backupDir}database.json`,
      JSON.stringify({ records, archives }, null, 2)
    );
    
    await FileSystem.writeAsStringAsync(
      `${backupDir}manifest.json`,
      JSON.stringify(manifest, null, 2)
    );

    onProgress?.({
      stage: 'zipping',
      current: 0,
      total: 100,
      message: 'Creating backup file...'
    });

    // Create ZIP file
    const backupFilePath = `${FileSystem.documentDirectory}${backupName}${BACKUP_EXTENSION}`;
    await zip(backupDir, backupFilePath);

    // Clean up temp directory
    await FileSystem.deleteAsync(tempDir, { idempotent: true });

    onProgress?.({
      stage: 'complete',
      current: 100,
      total: 100,
      message: 'Backup created successfully'
    });

    return backupFilePath;
  } catch (error) {
    console.error('Backup creation failed:', error);
    throw error;
  }
}

/**
 * Restore from backup file
 */
export async function restoreBackup(
  backupFilePath: string,
  realm: Realm,
  replaceExisting: boolean = false,
  onProgress?: (progress: BackupProgress) => void
): Promise<void> {
  try {
    const tempDir = `${FileSystem.cacheDirectory}restore-temp/`;
    const extractDir = `${tempDir}extracted/`;
    
    await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });
    
    onProgress?.({
      stage: 'exporting',
      current: 0,
      total: 100,
      message: 'Extracting backup file...'
    });

    // Extract ZIP file
    await unzip(backupFilePath, extractDir);

    // Read manifest
    const manifestPath = `${extractDir}manifest.json`;
    const manifestContent = await FileSystem.readAsStringAsync(manifestPath);
    const manifest: BackupManifest = JSON.parse(manifestContent);

    // Validate version compatibility
    if (manifest.version !== BACKUP_VERSION) {
      throw new Error(`Unsupported backup version: ${manifest.version}`);
    }

    // Read database
    const databasePath = `${extractDir}database.json`;
    const databaseContent = await FileSystem.readAsStringAsync(databasePath);
    const { records, archives } = JSON.parse(databaseContent);

    onProgress?.({
      stage: 'compressing',
      current: 0,
      total: Object.keys(manifest.imageMappings).length,
      message: 'Restoring images...'
    });

    // Restore images
    const newImageMappings: { [oldPath: string]: string } = {};
    let imageIndex = 0;
    
    for (const [oldPath, filename] of Object.entries(manifest.imageMappings)) {
      const backupImagePath = `${extractDir}images/${filename}`;
      const newImagePath = `${FileSystem.documentDirectory}images/${filename}`;
      
      // Ensure images directory exists
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}images/`, { intermediates: true });
      
      await FileSystem.copyAsync({
        from: backupImagePath,
        to: newImagePath,
      });
      
      newImageMappings[oldPath] = newImagePath;
      
      onProgress?.({
        stage: 'compressing',
        current: ++imageIndex,
        total: Object.keys(manifest.imageMappings).length,
        message: `Restoring image ${imageIndex}/${Object.keys(manifest.imageMappings).length}`
      });
    }

    onProgress?.({
      stage: 'exporting',
      current: 50,
      total: 100,
      message: 'Restoring database...'
    });

    // Restore database
    realm.write(() => {
      if (replaceExisting) {
        realm.delete(realm.objects<Record>('Record'));
        realm.delete(realm.objects<Archive>('Archive').filtered('_id != "VIEW_ALL"'));
      }

      // Create archives first
      const archiveMap = new Map<string, Archive>();
      archives.forEach((archiveData: any) => {
        if (archiveData._id === 'VIEW_ALL') return; // Skip VIEW_ALL
        
        const archive = realm.create<Archive>('Archive', {
          _id: new BSON.UUID(archiveData._id),
          name: archiveData.name,
          lastDate: archiveData.lastDate ? new Date(archiveData.lastDate) : undefined,
          count: archiveData.count,
          order: archiveData.order,
          show: archiveData.show,
        });
        archiveMap.set(archiveData._id, archive);
      });

      // Create records and link to archives
      records.forEach((recordData: any) => {
        // Update image paths
        const updatedImagePaths = recordData.imagePath.map((path: string) => 
          newImageMappings[path] || path
        );

        const record = realm.create<Record>('Record', {
          _id: new BSON.UUID(recordData._id),
          date: new Date(recordData.date),
          imagePath: updatedImagePaths,
          imageRatio: recordData.imageRatio,
          body: recordData.body,
        });

        // Link to archives
        recordData.archiveIds.forEach((archiveId: string) => {
          const archive = archiveMap.get(archiveId);
          if (archive) {
            archive.records.push(record);
          }
        });
      });
    });

    // Clean up
    await FileSystem.deleteAsync(tempDir, { idempotent: true });

    onProgress?.({
      stage: 'complete',
      current: 100,
      total: 100,
      message: 'Restore completed successfully'
    });
  } catch (error) {
    console.error('Restore failed:', error);
    throw error;
  }
}

/**
 * List available backup files
 */
export async function listBackupFiles(): Promise<{ name: string; path: string; size: number; date: Date }[]> {
  try {
    const documentsDir = FileSystem.documentDirectory;
    if (!documentsDir) return [];

    const files = await FileSystem.readDirectoryAsync(documentsDir);
    const backupFiles = files.filter(file => file.endsWith(BACKUP_EXTENSION));
    
    const backupInfos = await Promise.all(
      backupFiles.map(async (filename) => {
        const path = `${documentsDir}${filename}`;
        const info = await FileSystem.getInfoAsync(path);
        
        return {
          name: filename.replace(BACKUP_EXTENSION, ''),
          path,
          size: info.exists ? (info as any).size || 0 : 0,
          date: new Date(info.exists ? (info as any).modificationTime || 0 : 0),
        };
      })
    );

    return backupInfos.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Failed to list backup files:', error);
    return [];
  }
}

/**
 * Delete backup file
 */
export async function deleteBackupFile(backupPath: string): Promise<void> {
  try {
    await FileSystem.deleteAsync(backupPath);
  } catch (error) {
    console.error('Failed to delete backup file:', error);
    throw error;
  }
}