import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  archiveListThunk,
  archiveListAction,
  archiveListSelector,
} from "@/slices/archiveListSlice";
import { ArchiveType } from "@/constants/types.interface";
import { useEffect } from "react";

export function useArchiveList() {
  const dispatch = useAppDispatch();

  const archiveList = useAppSelector(archiveListSelector.archiveListSelector);
  const refreshing = useAppSelector(archiveListSelector.refreshingSelector);

  useEffect(() => {
    dispatch(archiveListThunk.fetchArchiveList());
  }, [dispatch]);

  const refreshArchiveList = () => {
    dispatch(archiveListThunk.fetchArchiveList());
  };

  const handleCreateNewArchive = async (archiveName: string) => {
    await dispatch(archiveListThunk.createNewArchive(archiveName));
  };

  const handleChangeArchiveListOrder = async (
    newArchiveList: ArchiveType[],
  ) => {
    const newOrder = newArchiveList.map((archive) => archive._id);
    await dispatch(archiveListThunk.changeArchiveListOrder(newOrder));
  };

  const handleChangeArchiveName = async (archive: ArchiveType) => {
    await dispatch(archiveListThunk.modifyArchiveName(archive));
    await dispatch(archiveListThunk.fetchArchiveList());
  };

  const handleDeleteArchive = async (archive: ArchiveType) => {
    await dispatch(archiveListThunk.deleteArchiveTh(archive));
  };

  const setRefreshState = (state: boolean) => {
    dispatch(archiveListAction.setRefreshing(state));
  };

  return {
    archiveList,
    refreshing,
    setRefreshing: setRefreshState,
    refreshArchiveList,
    handleChangeArchiveListOrder,
    handleChangeArchiveName,
    handleDeleteArchive,
    createNewArchive: handleCreateNewArchive,
  };
}
