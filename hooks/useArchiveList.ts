import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  createArchiveListThunk,
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
    dispatch(createArchiveListThunk.fetchArchiveList());
  }, [dispatch]);

  const refreshArchiveList = () => {
    dispatch(createArchiveListThunk.fetchArchiveList());
  };

  const handleCreateNewArchive = async (archiveName: string) => {
    await dispatch(createArchiveListThunk.createNewArchive(archiveName));
  };

  const handleChangeArchiveListOrder = async (
    newArchiveList: ArchiveType[],
  ) => {
    const newOrder = newArchiveList.map((archive) => archive._id);
    await dispatch(createArchiveListThunk.changeArchiveListOrder(newOrder));
  };

  const handleChangeArchiveName = async (archive: ArchiveType) => {
    await dispatch(createArchiveListThunk.modifyArchiveName(archive));
    await dispatch(createArchiveListThunk.fetchArchiveList());
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
    createNewArchive: handleCreateNewArchive,
  };
}
