// selected date와 현재 archive를 관리하는 state를 redux로 관리하도록 변경

import { ArchiveType, RecordType } from "@/constants/types.interface";
import { getAllRecords, getRecordByArchive } from "@/db/record-method";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export type CalendarState = {
  selectedDate: string;
  currentArchive: ArchiveType | undefined;
  currentRecords: RecordType[];
  selectedDateRecors: RecordType[];
};

const initialState: CalendarState = {
  selectedDate: dayjs().format("YYYY-MM-DD"),
  currentArchive: undefined,
  currentRecords: [],
  selectedDateRecors: [],
};

const fetchCurrentArchiveRecords = createAsyncThunk(
  "calendar/fetchCurrentArchive",
  async (archive: ArchiveType | undefined) => {
    if (!archive) {
      const records: RecordType[] = await getAllRecords();
      return records;
    }
    const records: RecordType[] | undefined = await getRecordByArchive(
      archive._id,
    );
    return records;
  },
);

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
        state.selectedDate = action.payload.toDateString().split("T")[0];
      }
    },
    setCurrentArchive(state, action: PayloadAction<ArchiveType | undefined>) {
      state.currentArchive = action.payload;
    },
    setCurrentRecords(state, action: PayloadAction<RecordType[]>) {
      state.currentRecords = action.payload;
    },
    setSelectedDateRecords(state, action: PayloadAction<string>) {
      const records = state.currentRecords.filter(
        (record) => record.date.split("T")[0] === action.payload,
      );
      console.log("setSelectedDateRecords", records);
      state.selectedDateRecors = records;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCurrentArchiveRecords.fulfilled,
      (state, action: PayloadAction<RecordType[] | undefined>) => {
        if (!action.payload) {
          state.currentRecords = [];
          return;
        }
        state.currentRecords = action.payload;
      },
    );
  },
  selectors: {
    selectSelectedDate: (state) => state.selectedDate,
    selectCurrentArchive: (state) => state.currentArchive,
    selectCurrentRecords: (state) => state.currentRecords,
    selectSelectedDateRecords: (state) => state.selectedDateRecors,
  },
});

export const calendarThunks = {
  fetchCurrentArchiveRecords,
};
export const calendarSelector = calendarSlice.selectors;
export const calendarAction = calendarSlice.actions;
export default calendarSlice.reducer;
