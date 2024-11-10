import { RecordType } from "@/constants/types.interface";
import { createRecord } from "@/db/record-method";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImagePickerResult } from "expo-image-picker";

interface RecordState {
  date: string;
  image: ImagePickerResult | undefined;
  body: string;
  archiveId: string | undefined;
  archiveName: string | undefined;
}

const initialState: RecordState = {
  date: new Date().toISOString().split("T")[0],
  image: undefined,
  body: "",
  archiveId: undefined,
  archiveName: undefined,
};

const createNewRecord = createAsyncThunk(
  "home-new-record/createNewRecord",
  async (record: RecordType) => {
    try {
      // record를 db에 저장
      await createRecord(record);
    } catch (e) {
      console.error("[ERROR] error from creating new record", e);
    }
  },
);

export const homeNewRecordSlice = createSlice({
  name: "home-new-record",
  initialState,
  reducers: {
    setRecordDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setRecordImage(state, action: PayloadAction<ImagePickerResult>) {
      state.image = action.payload;
    },
    setRecordBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setRecordArchive(
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) {
      state.archiveId = action.payload.id;
      state.archiveName = action.payload.name;
    },
    resetRecord(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewRecord.fulfilled, (state) => {
      state = initialState;
    });
  },
  selectors: {
    selectRecordDate: (state) => state.date,
    selectRecordImage: (state) => state.image,
    selectRecordBody: (state) => state.body,
    selectRecordArchive: (state) => ({
      id: state.archiveId,
      name: state.archiveName,
    }),
    selectRecord: (state) => state,
  },
});
export const createNewRecordThunk = { createNewRecord };
export const homeNewRecordSelector = homeNewRecordSlice.selectors;
export const homeNewRecordAction = homeNewRecordSlice.actions;
export default homeNewRecordSlice.reducer;
