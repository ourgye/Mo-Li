import Archive from "@/db/schema/archive";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import Realm from "realm";

export type CalendarState = {
  selectedDate: string;
  currentArchiveId: Realm.BSON.UUID | string | undefined;
  currentArchiveName: string | undefined;
};

const initialState: CalendarState = {
  selectedDate: dayjs().format("YYYY-MM-DD"),
  currentArchiveId: undefined,
  currentArchiveName: undefined,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<Date | string>) {
      state.selectedDate = dayjs(action.payload).format("YYYY-MM-DD");
    },
    setCurrentArchiveId(
      state,
      action: PayloadAction<Realm.BSON.UUID | undefined>,
    ) {
      state.currentArchiveId = action.payload;
    },
    setCurrentArchiveName(state, action: PayloadAction<string | undefined>) {
      state.currentArchiveName = action.payload;
    },
    setCurrentArchive(state, action: PayloadAction<Archive | undefined>) {
      if (action.payload === undefined) {
        state.currentArchiveId = undefined;
        state.currentArchiveName = undefined;
        return;
      }
      state.currentArchiveId = action.payload._id;
      state.currentArchiveName = action.payload.name;
    },
    setToInitialState(state) {
      state.currentArchiveId = undefined;
      state.currentArchiveName = undefined;
      state.selectedDate = dayjs().toDate().toString();
    },
  },
  selectors: {
    seletedDateSelector: (state) => state.selectedDate,
    currentArchiveIdSeletor: (state) => state.currentArchiveId,
    currentArchiveNameSeletor: (state) => state.currentArchiveName,
  },
});

export const calendarSelector = calendarSlice.selectors;
export const calendarAction = calendarSlice.actions;
export default calendarSlice.reducer;
