import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  calendarAction,
  calendarSelector,
  calendarThunks,
} from "@/slices/home/calendarSlice";
import { ArchiveType } from "@/constants/types.interface";

export function useCalendar() {
  const dispatch = useAppDispatch();

  const [
    selectedDate_s,
    currentArchive_s,
    currentRecords_s,
    selectedDateRecords_s,
  ] = [
    useAppSelector(calendarSelector.selectSelectedDate),
    useAppSelector(calendarSelector.selectCurrentArchive),
    useAppSelector(calendarSelector.selectCurrentRecords),
    useAppSelector(calendarSelector.selectSelectedDateRecords),
  ];

  const [selectedDate, currentArchive, currentRecords, selectedDateRecords] =
    useMemo(
      () => [
        selectedDate_s,
        currentArchive_s,
        currentRecords_s,
        selectedDateRecords_s,
      ],
      [
        selectedDate_s,
        currentArchive_s,
        currentRecords_s,
        selectedDateRecords_s,
      ],
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
      // console.log("handleChangeCurrentArchive", archive, date);

      dispatch(calendarAction.setCurrentArchive(archive));
      await dispatch(calendarThunks.fetchCurrentArchiveRecords(archive));
      handleChangeSelectedDate(date);
    },
    [dispatch, handleChangeSelectedDate],
  );

  const handleIndexRefresh = useCallback(() => {
    dispatch(calendarAction.setToInitialState());
  }, [dispatch]);

  return {
    selectedDate,
    currentArchive,
    currentRecords,
    selectedDateRecords,
    handleChangeSelectedDate,
    handleChangeCurrentArchive,
    handleIndexRefresh,
  };
}
