import {
  recordByArchiveAction,
  recordByArchiveThunk,
  recordByArchiveSelector,
} from "@/slices/archive/recordByArchiveSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { ArchiveType, RecordType } from "@/constants/types.interface";

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

  const handelDeleteRecordsByArchive = async (archiveId: string) => {
    await dispatch(recordByArchiveThunk.deleteRecordsByArchiveID(archiveId));
  };

  return {
    currentArchive,
    recordList,
    currentOrder,
    selectedRecord,
    handleChangeArchive,
    handelDeleteRecordsByArchive,
    setCurrentArchive,
    setCurrentOrder,
    setSelectedRecord,
  };
}
