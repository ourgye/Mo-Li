// 홈 라우터 안에 있는 create record 페이지에서 사용하는 slice
import { createSlice } from "@reduxjs/toolkit";
import type { RecordDataToSave } from "@/constants/types.interface";

const initialState: RecordDataToSave = {
  date: new Date().toISOString().split("T")[0],
  image: undefined,
  body: "",
  archive: undefined,
};

export const homeRecordSlice = createSlice({
  name: "homeRecord",
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
} = homeRecordSlice.actions;
export const selectRecordDate = (state: { homeRecord: RecordDataToSave }) =>
  state.homeRecord.date;
export const selectRecordImage = (state: { homeRecord: RecordDataToSave }) =>
  state.homeRecord.image;
export const selectRecordBody = (state: { homeRecord: RecordDataToSave }) =>
  state.homeRecord.body;
export const selectRecordArchive = (state: { homeRecord: RecordDataToSave }) =>
  state.homeRecord.archive;
export const selectRecord = (state: { homeRecord: RecordDataToSave }) =>
  state.homeRecord;

export default homeRecordSlice.reducer;
