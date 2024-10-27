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
    (date: Date | string) => {
      dispatch(calendarAction.setSelectedDate(date));
    },
    [dispatch],
  );
  const handleChangeCurrentArchive = useCallback(
    async (archive: ArchiveType | undefined) => {
      dispatch(calendarAction.setCurrentArchive(archive));
      dispatch(calendarThunks.fetchCurrentArchiveRecords(archive));
    },
    [dispatch],
  );
  const handleChangeSeletedDateRecords = useCallback(
    (date: string) => {
      dispatch(calendarAction.setSelectedDateRecords(date));
    },
    [dispatch],
  );

  return {
    selectedDate,
    currentArchive,
    currentRecords,
    selectedDateRecords,
    handleChangeSelectedDate,
    handleChangeCurrentArchive,
    handleChangeSeletedDateRecords,
  };
}
