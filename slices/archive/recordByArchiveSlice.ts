import { ArchiveType, RecordType } from "@/constants/types.interface";
import {
  getRecordByArchive,
  deleteAllRecordsByArchive,
  deleteRecord,
  modifyRecord,
} from "@/db/record-method";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { ImagePickerResult } from "expo-image-picker";

interface ArchiveState {
  currentArchive: ArchiveType | undefined;
  currentOrder: "최신순" | "오래된 순";
  recordList: RecordType[];
  selectedRecord: RecordType | undefined;
  modifyRecord: RecordType | undefined;
  modifyRecordImage: ImagePickerResult | undefined;
  modifyRecordImageRatio: number | undefined;
}

const intialState: ArchiveState = {
  currentArchive: undefined,
  recordList: [],
  currentOrder: "최신순",
  selectedRecord: undefined,
  modifyRecord: undefined,
  modifyRecordImage: undefined,
  modifyRecordImageRatio: undefined,
};

const getRecordByArchiveID = createAsyncThunk(
  "record-by-archive/getRecordByArchive",
  async (archiveId: string) => {
    return await getRecordByArchive(archiveId);
  },
);

const deleteRecordsByArchiveID = createAsyncThunk(
  "record-by-archive/deleteRecordsByArchive",
  async (archiveId: string) => {
    await deleteAllRecordsByArchive(archiveId);
    return archiveId;
  },
);

const deleteRecordByID = createAsyncThunk(
  "record-by-archive/deleteRecordByID",
  async (record: RecordType) => {
    await deleteRecord(record._id, record.archiveId, record.imagePath);
    return record._id;
  },
);

const modifyRecordByID = createAsyncThunk(
  "record-by-archive/modifyRecordByID",
  async (item: {
    record: RecordType;
    newImagePath: string | undefined;
    newImageRatio: number | undefined;
  }) => {
    const newRecord: RecordType = {
      ...item.record,
      imagePath: item.newImagePath || item.record.imagePath,
      imageRatio: item.newImageRatio || item.record.imageRatio,
    };
    await modifyRecord(newRecord);
    return newRecord;
  },
);

const recordByArchiveSlice = createSlice({
  name: "record-by-archive",
  initialState: intialState,
  reducers: {
    setCurrentArchive(state, action: PayloadAction<ArchiveType | undefined>) {
      state.currentArchive = action.payload;
    },
    setRecordList(state, action: PayloadAction<RecordType[]>) {
      state.recordList = action.payload;
    },
    setCurrentOrder(state, action: PayloadAction<"최신순" | "오래된 순">) {
      state.currentOrder = action.payload;
      console.log(state.recordList);
      state.recordList = state.recordList.sort((a, b) => {
        const value =
          dayjs(a.date, "YYYY-MM-DDTHH:mm:ss").valueOf() -
          dayjs(b.date, "YYYY-MM-DDTHH:mm:ss").valueOf();
        return action.payload === "최신순" ? -value : value;
      });
    },
    setSelectedRecord(state, action: PayloadAction<RecordType | undefined>) {
      state.selectedRecord = action.payload;
    },
    setModifyRecord(state, action: PayloadAction<RecordType | undefined>) {
      state.modifyRecord = action.payload;
    },
    modifyRecordDate(state, action: PayloadAction<string>) {
      if (state.modifyRecord) {
        state.modifyRecord.date = action.payload;
      }
    },
    modifyRecordBody(state, action: PayloadAction<string>) {
      if (state.modifyRecord) {
        state.modifyRecord.body = action.payload;
      }
    },
    setModifyRecordImage(state, action: PayloadAction<ImagePickerResult>) {
      state.modifyRecordImage = action.payload;
    },
    setModifyRecordImageRatio(state, action: PayloadAction<number>) {
      state.modifyRecordImageRatio = action.payload;
    },
    setModifyRecordImageUndefined(state) {
      state.modifyRecordImage = undefined;
      state.modifyRecordImageRatio = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getRecordByArchiveID.fulfilled,
      (state, action: PayloadAction<RecordType[] | undefined>) => {
        const recordList = action.payload;

        if (!recordList) {
          state.recordList = [];
          return;
        }

        state.recordList = recordList.sort((a, b) => {
          const value =
            dayjs(a.date, "YYYY-MM-DDTHH:mm:ss").valueOf() -
            dayjs(b.date, "YYYY-MM-DDTHH:mm:ss").valueOf();
          return state.currentOrder === "최신순" ? -value : value;
        });
      },
    );
    // 수정 필요
    builder.addCase(
      deleteRecordsByArchiveID.fulfilled,
      (state, action: PayloadAction<string>) => {
        if (state.currentArchive?._id === action.payload) {
          state.currentArchive = undefined;
          state.recordList = [];
        }
      },
    );
    builder.addCase(
      deleteRecordByID.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.recordList = state.recordList.filter(
          (record) => record._id !== action.payload,
        );
        state.selectedRecord = undefined;
      },
    );
    builder.addCase(
      modifyRecordByID.fulfilled,
      (state, action: PayloadAction<RecordType>) => {
        const index = state.recordList.findIndex(
          (record) => record._id === action.payload._id,
        );
        if (index !== -1) {
          state.recordList[index] = action.payload;
          state.selectedRecord = action.payload;
        }
      },
    );
  },
  selectors: {
    selectCurrentArchive: (state) => state.currentArchive,
    selectRecordList: (state) => state.recordList,
    selectCurrentOrder: (state) => state.currentOrder,
    selectSelectedRecord: (state) => state.selectedRecord,
    selectModifyRecord: (state) => state.modifyRecord,
    selectModifyRecordImage: (state) => state.modifyRecordImage,
    selectModifyRecordImageRatio: (state) => state.modifyRecordImageRatio,
  },
});

export const recordByArchiveThunk = {
  getRecordByArchiveID,
  deleteRecordsByArchiveID,
  deleteRecordByID,
  modifyRecordByID,
};
export const recordByArchiveAction = recordByArchiveSlice.actions;
export const recordByArchiveSelector = recordByArchiveSlice.selectors;
export default recordByArchiveSlice.reducer;
