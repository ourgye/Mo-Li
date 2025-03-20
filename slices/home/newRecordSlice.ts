import { RecordType } from "@/constants/types.interface";
import { createRecord } from "@/db/record-method";
import { RootState } from "@/store";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { ImagePickerResult } from "expo-image-picker";

interface RecordState {
  date: string;
  image: ImagePickerResult | undefined;
  body: string;
  archiveId: string | undefined;
  archiveName: string | undefined;
  imageRatio: number;
  isThereNewRecord: boolean;
}

const initialState: RecordState = {
  date: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
  image: undefined,
  body: "",
  archiveId: undefined,
  archiveName: undefined,
  imageRatio: 0,
  isThereNewRecord: false,
};

const createNewRecord = createAsyncThunk(
  "home/createNewRecord",
  async (record: RecordType) => {
    try {
      // record를 db에 저장
      await createRecord(record);
    } catch (e) {
      console.error("[ERROR] error from creating new record", e);
    }
  },
);

export const newRecordSlice = createSlice({
  name: "new-record",
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
    setIsThereNewRecord(state, action: PayloadAction<boolean>) {
      state.isThereNewRecord = action.payload;
    },
    setImageRatio(state, action: PayloadAction<number>) {
      state.imageRatio = action.payload;
    },
    resetRecord(state) {
      state = { ...initialState, date: dayjs().format("YYYY-MM-DDTHH:mm:ss") };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewRecord.fulfilled, (state) => {
      state.date = initialState.date;
      state.image = initialState.image;
      state.body = initialState.body;
      state.archiveId = initialState.archiveId;
      state.archiveName = initialState.archiveName;
      state.isThereNewRecord = true;
    });
  },
  selectors: {
    selectRecordDate: (state) => state.date,
    selectRecordImage: (state) => state.image,
    selectRecordBody: (state) => state.body,
    selectImageRatio: (state) => state.imageRatio,
    selectRecord: (state) => state,
    selectIsThereNewRecord: (state) => state.isThereNewRecord,
  },
});
export const newRecordArchiveSelector = createSelector(
  (state: RootState) => state["new-record"],
  (state) => ({ id: state.archiveId, name: state.archiveName }),
);

export const createNewRecordThunk = { createNewRecord };
export const newRecordSelector = newRecordSlice.selectors;
export const newRecordAction = newRecordSlice.actions;
export default newRecordSlice.reducer;
