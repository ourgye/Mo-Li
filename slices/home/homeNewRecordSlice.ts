import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecordState{
  date: string;
  image: string | undefined;
  body: string;
  archive: string | undefined;
}

const initialState: RecordState = {
  date: new Date().toISOString().split("T")[0],
  image: undefined,
  body: "",
  archive: undefined,
};

export const homeNewRecordSlice = createSlice({
  name: "home-new-record",
  initialState,
  reducers: {
    setRecordDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setRecordImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setRecordBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setRecordArchive(state, action: PayloadAction<string>) {
      state.archive = action.payload;
    },
    resetRecord(state) {
      state = initialState;
    }
  },
  selectors: {
    selectRecordDate: (state) => state.date,
    selectRecordImage: (state) => state.image,
    selectRecordBody: (state) => state.body,
    selectRecordArchive: (state) => state.archive,
    selectRecord: (state) => state,
  }
});

export const homeNewRecordSelector = homeNewRecordSlice.selectors;
export const homeNewRecordAction = homeNewRecordSlice.actions;
export default homeNewRecordSlice.reducer;
