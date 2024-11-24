import { ArchiveType, RecordType } from "@/constants/types.interface";
import { getRecordByArchive } from "@/db/record-method";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface ArchiveState {
  currentArchive: ArchiveType | undefined;
  currentOrder: "최신순" | "오래된 순";
  recordList: RecordType[];
  selectedRecord: RecordType | undefined;
}

const intialState: ArchiveState = {
  currentArchive: undefined,
  recordList: [],
  currentOrder: "최신순",
  selectedRecord: undefined,
};

const getRecordByArchiveID = createAsyncThunk(
  "record-by-archive/getRecordByArchive",
  async (archiveId: string) => {
    return await getRecordByArchive(archiveId);
  }
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
      }
    );
  },
  selectors: {
    selectCurrentArchive: (state) => state.currentArchive,
    selectRecordList: (state) => state.recordList,
    selectCurrentOrder: (state) => state.currentOrder,
    selectSelectedRecord: (state) => state.selectedRecord,
  },
});

export const recordByArchiveThunk = {
  getRecordByArchiveID,
};
export const recordByArchiveAction = recordByArchiveSlice.actions;
export const recordByArchiveSelector = recordByArchiveSlice.selectors;
export default recordByArchiveSlice.reducer;
