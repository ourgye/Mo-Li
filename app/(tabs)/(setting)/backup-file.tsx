import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";
import { useRealm } from "@realm/react";
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';

import {
  createBackup,
  restoreBackup,
  listBackupFiles,
  deleteBackupFile,
  BackupProgress,
} from "@/utils/backup";
import typos from "@/assets/fonts/typos";
import colors from "@/assets/colors/colors";

interface BackupFileInfo {
  name: string;
  path: string;
  size: number;
  date: Date;
}

export default function BackupFile() {
  const realm = useRealm();
  const [backupFiles, setBackupFiles] = useState<BackupFileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<BackupProgress | null>(null);

  const loadBackupFiles = useCallback(async () => {
    try {
      const files = await listBackupFiles();
      setBackupFiles(files);
    } catch (error) {
      console.error('Failed to load backup files:', error);
      Alert.alert('오류', '백업 파일 목록을 불러올 수 없습니다.');
    }
  }, []);

  useEffect(() => {
    loadBackupFiles();
  }, [loadBackupFiles]);

  const handleCreateBackup = useCallback(async () => {
    setLoading(true);
    setProgress(null);
    
    try {
      const backupPath = await createBackup(realm, (progress) => {
        setProgress(progress);
      });
      
      Alert.alert(
        '백업 완료',
        '백업이 성공적으로 생성되었습니다. 공유하시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '공유',
            onPress: async () => {
              if (await Sharing.isAvailableAsync()) {
                Sharing.shareAsync(backupPath);
              }
            },
          },
        ]
      );
      
      await loadBackupFiles();
    } catch (error) {
      console.error('Backup failed:', error);
      Alert.alert('백업 실패', '백업을 생성하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setProgress(null);
    }
  }, [realm, loadBackupFiles]);

  const handleRestoreFromFile = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      Alert.alert(
        '복원 확인',
        '기존 데이터를 어떻게 처리하시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '병합',
            onPress: () => performRestore(result.assets[0].uri, false),
          },
          {
            text: '교체',
            style: 'destructive',
            onPress: () => performRestore(result.assets[0].uri, true),
          },
        ]
      );
    } catch (error) {
      console.error('File selection failed:', error);
      Alert.alert('오류', '파일을 선택할 수 없습니다.');
    }
  }, []);

  const performRestore = useCallback(async (backupPath: string, replace: boolean) => {
    setLoading(true);
    setProgress(null);

    try {
      await restoreBackup(backupPath, realm, replace, (progress) => {
        setProgress(progress);
      });

      Alert.alert('복원 완료', '백업이 성공적으로 복원되었습니다.');
      await loadBackupFiles();
    } catch (error) {
      console.error('Restore failed:', error);
      Alert.alert('복원 실패', '백업 복원 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setProgress(null);
    }
  }, [realm, loadBackupFiles]);

  const handleRestoreBackup = useCallback((backupFile: BackupFileInfo) => {
    Alert.alert(
      '복원 확인',
      `"${backupFile.name}" 백업을 복원하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '병합',
          onPress: () => performRestore(backupFile.path, false),
        },
        {
          text: '교체',
          style: 'destructive',
          onPress: () => performRestore(backupFile.path, true),
        },
      ]
    );
  }, [performRestore]);

  const handleDeleteBackup = useCallback((backupFile: BackupFileInfo) => {
    Alert.alert(
      '삭제 확인',
      `"${backupFile.name}" 백업을 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBackupFile(backupFile.path);
              await loadBackupFiles();
              Alert.alert('삭제 완료', '백업 파일이 삭제되었습니다.');
            } catch (error) {
              Alert.alert('삭제 실패', '백업 파일을 삭제할 수 없습니다.');
            }
          },
        },
      ]
    );
  }, [loadBackupFiles]);

  const handleShareBackup = useCallback(async (backupFile: BackupFileInfo) => {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(backupFile.path);
      } else {
        Alert.alert('공유 불가', '이 기기에서는 파일 공유를 사용할 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('공유 실패', '파일을 공유할 수 없습니다.');
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString('ko-KR');
  };

  const renderBackupItem = ({ item }: { item: BackupFileInfo }) => (
    <View style={{
      backgroundColor: colors.white0,
      padding: 16,
      marginBottom: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.gray3,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={[typos.subtitle2_typo, { flex: 1 }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[typos.caption1_typo, { color: colors.gray3 }]}>
          {formatFileSize(item.size)}
        </Text>
      </View>
      
      <Text style={[typos.caption1_typo, { color: colors.gray3, marginBottom: 12 }]}>
        {formatDate(item.date)}
      </Text>
      
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable
          style={{
            backgroundColor: colors.blued1,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            flex: 1,
          }}
          onPress={() => handleRestoreBackup(item)}
        >
          <Text style={[typos.caption1_typo, { color: colors.white0, textAlign: 'center' }]}>
            복원
          </Text>
        </Pressable>
        
        <Pressable
          style={{
            backgroundColor: colors.gray3,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            flex: 1,
          }}
          onPress={() => handleShareBackup(item)}
        >
          <Text style={[typos.caption1_typo, { color: colors.white0, textAlign: 'center' }]}>
            공유
          </Text>
        </Pressable>
        
        <Pressable
          style={{
            backgroundColor: colors.yellow0,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            flex: 1,
          }}
          onPress={() => handleDeleteBackup(item)}
        >
          <Text style={[typos.caption1_typo, { color: colors.black0, textAlign: 'center' }]}>
            삭제
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white0 }}>
      <View style={{ flex: 1, padding: 16 }}>
        {/* Action buttons */}
        <View style={{ marginBottom: 24, gap: 12 }}>
          <Pressable
            style={{
              backgroundColor: colors.blued1,
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
              opacity: loading ? 0.6 : 1,
            }}
            onPress={handleCreateBackup}
            disabled={loading}
          >
            <Text style={[typos.subtitle2_typo, { color: colors.white0 }]}>
              새 백업 생성
            </Text>
          </Pressable>
          
          <Pressable
            style={{
              backgroundColor: colors.gray3,
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
              opacity: loading ? 0.6 : 1,
            }}
            onPress={handleRestoreFromFile}
            disabled={loading}
          >
            <Text style={[typos.subtitle2_typo, { color: colors.white0 }]}>
              파일에서 복원
            </Text>
          </Pressable>
        </View>

        {/* Progress indicator */}
        {progress && (
          <View style={{
            backgroundColor: colors.gray3,
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
          }}>
            <Text style={[typos.caption1_typo, { color: colors.white0, marginBottom: 8 }]}>
              {progress.message}
            </Text>
            <View style={{
              backgroundColor: colors.white0,
              height: 4,
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <View style={{
                backgroundColor: colors.blued1,
                height: '100%',
                width: `${(progress.current / progress.total) * 100}%`,
              }} />
            </View>
          </View>
        )}

        {/* Backup files list */}
        <View style={{ flex: 1 }}>
          <Text style={[typos.subtitle2_typo, { marginBottom: 16 }]}>
            백업 파일 ({backupFiles.length})
          </Text>
          
          {backupFiles.length === 0 ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={[typos.body1_typo, { color: colors.gray3 }]}>
                백업 파일이 없습니다
              </Text>
            </View>
          ) : (
            <FlatList
              data={backupFiles}
              renderItem={renderBackupItem}
              keyExtractor={(item) => item.path}
              showsVerticalScrollIndicator={false}
              refreshing={loading}
              onRefresh={loadBackupFiles}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
