// 홈 라우터 안에 있는 create record 페이지에서 사용하는 slice
import { createSlice } from "@reduxjs/toolkit";
import type { RecordDataToSave } from "@/constants/types.interface";

const initialState: RecordDataToSave = {
  date: new Date().toISOString().split("T")[0],
  image: undefined,
  body: "",
  archive: undefined,
};

export const archiveRecordSlice = createSlice({
  name: "archiveRecord",
  initialState,
  reducers: {
    setRecordDate(state, action) {
      state.date = action.payload;
    },
    setRecordImage(state, action) {
      state.image = action.payload;
    },
    setRecordBody(state, action) {
      state.body = action.payload;
    },
    setRecordArchive(state, action) {
      state.archive = action.payload;
    },
    resetRecord(state) {
      state.date = new Date().toISOString().split("T")[0];
      state.image = undefined;
      state.body = "";
      state.archive = undefined;
    }
  },
});

export const {
  setRecordDate,
  setRecordImage,
  setRecordBody,
  setRecordArchive,
  resetRecord,
} = archiveRecordSlice.actions;
export const selectRecordDate = (state: { archiveRecord: RecordDataToSave }) =>
  state.archiveRecord.date;
export const selectRecordImage = (state: { archiveRecord: RecordDataToSave }) =>
  state.archiveRecord.image;
export const selectRecordBody = (state: { archiveRecord: RecordDataToSave }) =>
  state.archiveRecord.body;
export const selectRecordArchive = (state: { archiveRecord: RecordDataToSave }) =>
  state.archiveRecord.archive;
export const selectRecord = (state: { archiveRecord: RecordDataToSave }) =>
  state.archiveRecord;

export default archiveRecordSlice.reducer;
