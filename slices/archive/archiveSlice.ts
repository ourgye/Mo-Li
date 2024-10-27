import { ArchiveType, RecordType } from "@/constants/types.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const archiveSlice = createSlice({
  name: "archive",
  initialState: intialState,
  reducers: {
    setCurrentArchive(state, action: PayloadAction<ArchiveType | undefined>) {
      state.currentArchive = action.payload;
    },
    setRecordList(state, action: PayloadAction<RecordType[]>) {
      state.recordList = action.payload;
    },
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
      state.recordList = state.recordList.sort((a, b) => {
        if (action.payload.order === "최신순") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    },
  },
  selectors: {
    selectCurrentArchive: (state) => state.currentArchive,
    selectRecordList: (state) => state.recordList,
    selectCurrentOrder: (state) => state.currentOrder,
  },
});

export const archiveAction = archiveSlice.actions;
export const archiveSelector = archiveSlice.selectors;
export default archiveSlice.reducer;
