import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { calendarAction, calendarSelector } from "@/slices/calendarSlice";
import Realm from "realm";
import Archive from "@/db/schema/archive";

const useCalendar = () => {
  const dispatch = useAppDispatch();

  const [selectedDate, currentArchiveId, currentArchiveName] = [
    useAppSelector(calendarSelector.seletedDateSelector),
    useAppSelector(calendarSelector.currentArchiveIdSeletor),
    useAppSelector(calendarSelector.currentArchiveNameSeletor),
  ];

  const handleChangeSelectedDate = useCallback(
    (date: string) => {
      dispatch(calendarAction.setSelectedDate(date));
    },
    [dispatch],
  );

  const handleChangeCurrentArchiveId = useCallback(
    async (archiveId: Realm.BSON.UUID | undefined) => {
      dispatch(calendarAction.setCurrentArchiveId(archiveId));
    },
    [dispatch, handleChangeSelectedDate],
  );

  const handleChangeCurrentArchiveName = useCallback(
    (name: string | undefined) => {
      dispatch(calendarAction.setCurrentArchiveName(name));
    },
    [dispatch],
  );

  const handleChangeCurrentArchive = useCallback(
    (archive: Archive | undefined) => {
      dispatch(calendarAction.setCurrentArchive(archive));
    },
    [handleChangeCurrentArchiveId, handleChangeCurrentArchiveName],
  );

  return {
    selectedDate,
    currentArchiveId,
    currentArchiveName,
    handleChangeSelectedDate,
    handleChangeCurrentArchiveId,
    handleChangeCurrentArchiveName,
    handleChangeCurrentArchive,
  };
};

export { useCalendar };
