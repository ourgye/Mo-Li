import {
  recordByArchiveAction,
  recordByArchiveThunk,
  recordByArchiveSelector,
} from "@/slices/archive/recordByArchiveSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { ArchiveType, RecordType } from "@/constants/types.interface";
import { ImagePickerResult } from "expo-image-picker";
import { modifyImage, deleteImageFile } from "@/utils/saveImage2File";

export function useRecord() {
  const dispatch = useAppDispatch();

  const currentArchive = useAppSelector(
    recordByArchiveSelector.selectCurrentArchive,
  );

  // 아카이브 리스트에 따라 레코드를 가져오는 로직
  const recordList = useAppSelector(recordByArchiveSelector.selectRecordList);
  const currentOrder = useAppSelector(
    recordByArchiveSelector.selectCurrentOrder,
  );
  const selectedRecord = useAppSelector(
    recordByArchiveSelector.selectSelectedRecord,
  );
  const modifyRecord = useAppSelector(
    recordByArchiveSelector.selectModifyRecord,
  );
  const modifyRecordImage = useAppSelector(
    recordByArchiveSelector.selectModifyRecordImage,
  );
  const modifyRecordImageRatio = useAppSelector(
    recordByArchiveSelector.selectModifyRecordImageRatio,
  );

  const handleChangeArchive = async (archiveId: string) => {
    await dispatch(recordByArchiveThunk.getRecordByArchiveID(archiveId));
  };
  const setCurrentArchive = (archive: ArchiveType) => {
    dispatch(recordByArchiveAction.setCurrentArchive(archive));
  };
  const setCurrentOrder = (order: "최신순" | "오래된 순") => {
    dispatch(recordByArchiveAction.setCurrentOrder(order));
  };
  const setSelectedRecord = (record: RecordType) => {
    dispatch(recordByArchiveAction.setSelectedRecord(record));
  };
  const setModifyRecord = (record: RecordType) => {
    dispatch(recordByArchiveAction.setModifyRecord(record));
  };
  const setModifyRecordBody = (body: string) => {
    dispatch(recordByArchiveAction.modifyRecordBody(body));
  };
  const setModifyRecordDate = (date: string) => {
    dispatch(recordByArchiveAction.modifyRecordDate(date));
  };
  const setModifyRecordImageRatio = (imageRatio: number) => {
    dispatch(recordByArchiveAction.setModifyRecordImageRatio(imageRatio));
  };
  const setModifyRecordImage = (image: ImagePickerResult) => {
    dispatch(recordByArchiveAction.setModifyRecordImage(image));
  };
  const setModifyRecordImageUndefined = () => {
    dispatch(recordByArchiveAction.setModifyRecordImageUndefined());
  };

  // 레코드 수정
  const handleModifyRecord = async (
    record: RecordType,
    image: ImagePickerResult | undefined,
    imageRatio: number | undefined,
    prevImagePath: string,
  ) => {
    const newImagePath = await modifyImage(image, record._id, prevImagePath);
    const newRecord = await dispatch(
      recordByArchiveThunk.modifyRecordByID({
        record: record,
        newImagePath: newImagePath,
        newImageRatio: imageRatio,
      }),
    );
    return newRecord;
  };

  // 레코드 삭제
  const handleDeleteRecord = async (record: RecordType) => {
    await dispatch(recordByArchiveThunk.deleteRecordByID(record));
  };

  // 아카이브 삭제 시 해당 아카이브 모든 레코드 삭제
  const handelDeleteRecordsByArchive = async (archiveId: string) => {
    await dispatch(recordByArchiveThunk.deleteRecordsByArchiveID(archiveId));
  };

  return {
    currentArchive,
    recordList,
    currentOrder,
    selectedRecord,
    modifyRecord,
    modifyRecordImage,
    modifyRecordImageRatio,
    handleChangeArchive,
    handelDeleteRecordsByArchive,
    handleDeleteRecord,
    handleModifyRecord,
    setCurrentArchive,
    setCurrentOrder,
    setSelectedRecord,
    setModifyRecord,
    setModifyRecordImage,
    setModifyRecordImageRatio,
    setModifyRecordBody,
    setModifyRecordDate,
    setModifyRecordImageUndefined,
  };
}
