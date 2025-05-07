import Archive from "@/db/schema/archive";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImagePickerAsset } from "expo-image-picker";

interface RecordState {
  date: Date;
  image: ImagePickerAsset[] | undefined;
  imagePath: string[];
  imageRatio: number[];
  body: string;
  archive: Archive | undefined;
}

const initialState: RecordState = {
  date: new Date(),
  image: undefined,
  imagePath: [],
  imageRatio: [],
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
    setRecordImage(state, action: PayloadAction<ImagePickerAsset[]>) {
      state.image = action.payload;
    },
    setRecordBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setImageRatio(state, action: PayloadAction<number[]>) {
      state.imageRatio = action.payload;
    },
    setArchive(state, action: PayloadAction<Archive | undefined>) {
      if (action.payload === undefined) {
        state.archive = undefined;
        return;
      }
      state.archive = action.payload;
    },
    setRecord(state, action: PayloadAction<Partial<RecordState>>) {
      const { date, imageRatio, imagePath, body, archive } = action.payload;
      if (date) state.date = date;
      if (imageRatio) state.imageRatio = imageRatio;
      if (imagePath) state.imagePath = imagePath;
      if (body) state.body = body;
      if (archive) state.archive = archive;

      state.image = undefined;
    },
    resetRecord(state) {
      state.date = new Date();
      state.image = undefined;
      state.imagePath = [];
      state.imageRatio = [];
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
    selectRecordImagePath: (state) => state.imagePath,
  },
});

export const recordSelector = recordSlice.selectors;
export const recordAction = recordSlice.actions;
export default recordSlice.reducer;
