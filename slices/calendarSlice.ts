// selected date와 현재 archive를 관리하는 state를 redux로 관리하도록 변경
// selected date type: Date, current archive type: Realm.BSON.ObjectId

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ArchiveData } from "@/constants/types.interface";

export type CalendarState = {
  selectedDate: string;
  currentArchive: ArchiveData | undefined;
};

const initialState: CalendarState = {
  selectedDate: new Date().toDateString(),
  currentArchive: undefined,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<Date | String>) {
      if (typeof action.payload === "string") {
        state.selectedDate = action.payload;
        return;
      }
      if (action.payload instanceof Date) {
        state.selectedDate = action.payload.toDateString();
      }
    },
    setCurrentArchive(state, action: PayloadAction<ArchiveData>) {
      state.currentArchive = action.payload;
    },
  },
});

export const { setSelectedDate, setCurrentArchive } = calendarSlice.actions;
export const selectSelectedDate = (state: { calendar: CalendarState }) =>
  state.calendar.selectedDate;
export const selectCurrentArchive = (state: { calendar: CalendarState }) =>
  state.calendar.currentArchive;

export default calendarSlice.reducer;
