import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Order from "@/constants/Order";
import {
  ArchiveDataWithRecentDate,
  OrderData,
  RecordDataWOArchive,
} from "@/constants/types.interface";

export type archiveState = {
  currentArchive: ArchiveDataWithRecentDate | undefined;
  recordList: RecordDataWOArchive[];
  currentOrder: OrderData;
  selectedRecordIndex: number | undefined;
  isUpdated: boolean;
};

const intialState: archiveState = {
  currentArchive: undefined,
  recordList: [],
  currentOrder: Order[0],
  selectedRecordIndex: undefined,
  isUpdated: false,
};

const archiveSlice = createSlice({
  name: "archive",
  initialState: intialState,
  reducers: {
    setCurrentArchive(state, action) {
      state.currentArchive = action.payload;
    },
    setRecordList(state, action) {
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
    setSelectedRecordIndex(state, action) {
      state.selectedRecordIndex = action.payload;
    },
  },
  selectors: {
    selectCurrentArchive: (state) => state.currentArchive,
    selectRecordList: (state) => state.recordList,
    selectCurrentOrder: (state) => state.currentOrder,
    selectSelectedRecordIndex: (state) => state.selectedRecordIndex,
  },
});

export const {
  setCurrentArchive,
  setRecordList,
  setCurrentOrder,
  setSelectedRecordIndex,
} = archiveSlice.actions;
export const {
  selectCurrentArchive,
  selectRecordList,
  selectCurrentOrder,
  selectSelectedRecordIndex,
} = archiveSlice.selectors;
export default archiveSlice.reducer;
