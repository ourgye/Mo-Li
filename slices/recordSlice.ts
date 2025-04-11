import Archive from "@/db/schema/archive";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImagePickerResult } from "expo-image-picker";

interface RecordState {
  date: Date;
  image: ImagePickerResult | undefined;
  imageRatio: number | undefined;
  body: string;
  archive: Archive | undefined;
}

const initialState: RecordState = {
  date: new Date(),
  image: undefined,
  imageRatio: undefined,
  archive: undefined,
  body: "",
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setRecordDate(state, action: PayloadAction<Date>) {
      state.date = action.payload;
    },
    setRecordImage(state, action: PayloadAction<ImagePickerResult>) {
      state.image = action.payload;
    },
    setRecordBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setImageRatio(state, action: PayloadAction<number>) {
      state.imageRatio = action.payload;
    },
    setArchive(state, action: PayloadAction<Archive | undefined>) {
      if (action.payload === undefined) {
        state.archive = undefined;
        return;
      }
      state.archive = action.payload;
    },
    resetRecord(state) {
      state.date = new Date();
      state.image = undefined;
      state.imageRatio = undefined;
      state.body = "";
      state.archive = undefined;
    },
  },
  selectors: {
    selectRecordDate: (state) => state.date,
    selectRecordImage: (state) => state.image,
    selectRecordBody: (state) => state.body,
    selectImageRatio: (state) => state.imageRatio,
    selectArchive: (state) => state.archive,
    selectRecord: (state) => state,
  },
});

export const recordSelector = recordSlice.selectors;
export const recordAction = recordSlice.actions;
export default recordSlice.reducer;
