import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  calendarAction,
  calendarSelector,
  calendarThunks,
} from "@/slices/home/calendarSlice";
import { ArchiveType } from "@/constants/types.interface";

export function useCalendar() {
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector(calendarSelector.selectSelectedDate);
  const currentArchive = useAppSelector(calendarSelector.selectCurrentArchive);
  const currentRecords = useAppSelector(calendarSelector.selectCurrentRecords);
  const selectedDateRecords = useAppSelector(
    calendarSelector.selectSelectedDateRecords,
  );
  const handleChangeSelectedDate = useCallback(
    (date: string) => {
      dispatch(calendarAction.setSelectedDate(date));
      dispatch(calendarAction.setSelectedDateRecords(date));
    },
    [dispatch],
  );
  const handleChangeCurrentArchive = useCallback(
    async (archive: ArchiveType | undefined, date: string) => {
      console.log("handleChangeCurrentArchive", archive, date);

      dispatch(calendarAction.setCurrentArchive(archive));
      await dispatch(calendarThunks.fetchCurrentArchiveRecords(archive));
      handleChangeSelectedDate(date);
    },
    [dispatch, handleChangeSelectedDate],
  );

  return {
    selectedDate,
    currentArchive,
    currentRecords,
    selectedDateRecords,
    handleChangeSelectedDate,
    handleChangeCurrentArchive,
  };
}
