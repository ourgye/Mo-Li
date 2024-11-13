import { ArchiveType, RecordType } from "@/constants/types.interface";
import { getRecordByArchive } from "@/db/record-method";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface ArchiveState {
  currentArchive: ArchiveType | undefined;
  currentOrder: "최신순" | "오래된순";
  recordList: RecordType[];
}

const intialState: ArchiveState = {
  currentArchive: undefined,
  recordList: [],
  currentOrder: "최신순",
};

const getRecordByArchiveID = createAsyncThunk(
  "record-by-archive/getRecordByArchive",
  async (archiveId: string) => {
    return await getRecordByArchive(archiveId);
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
    setCurrentOrder(state, action: PayloadAction<"최신순" | "오래된순">) {
      state.currentOrder = action.payload;
      state.recordList = state.recordList.sort((a, b) => {
        if (action.payload === "최신순") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
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
          if (state.currentOrder === "최신순") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      },
    );
  },
  selectors: {
    selectCurrentArchive: (state) => state.currentArchive,
    selectRecordList: (state) => state.recordList,
    selectCurrentOrder: (state) => state.currentOrder,
  },
});

export const recordByArchiveThunk = {
  getRecordByArchiveID,
};
export const recordByArchiveAction = recordByArchiveSlice.actions;
export const recordByArchiveSelector = recordByArchiveSlice.selectors;
export default recordByArchiveSlice.reducer;
