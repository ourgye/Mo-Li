import {
  recordByArchiveAction,
  recordByArchiveThunk,
  recordByArchiveSelector,
} from "@/slices/archive/recordByArchiveSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { ArchiveType, RecordType } from "@/constants/types.interface";

export function useRecordByArchive() {
  const dispatch = useAppDispatch();

  const currentArchive = useAppSelector(
    recordByArchiveSelector.selectCurrentArchive,
  );
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
  const setCurrentOrder = (order: "최신순" | "오래된순") => {
    dispatch(recordByArchiveAction.setCurrentOrder(order));
  };
  const setSelectedRecord = (record: RecordType) => {
    dispatch(recordByArchiveAction.setSelectedRecord(record));
  };

  return {
    currentArchive,
    recordList,
    currentOrder,
    selectedRecord,
    handleChangeArchive,
    setCurrentArchive,
    setCurrentOrder,
    setSelectedRecord,
  };
}
