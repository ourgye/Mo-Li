import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllArchives,
  createArchive,
  changeArchiveOrder,
  modifyArchive,
  deleteArchive,
} from "@/db/archive-method";
import { ArchiveType } from "@/constants/types.interface";
import { nanoid } from "nanoid";

export const fetchArchiveList = createAsyncThunk(
  "archives/fetchAll",
  async () => {
    return await getAllArchives();
  },
);

export const createNewArchive = createAsyncThunk(
  "archives/create",
  async (archiveName: string) => {
    const archive: ArchiveType = {
      _id: nanoid(),
      name: archiveName,
      lastDate: undefined,
      count: 0,
    };
    await createArchive(archive);
    return archive;
  },
);

export const changeArchiveListOrder = createAsyncThunk(
  "archives/changeOrder",
  async (newArchiveList: string[]) => {
    await changeArchiveOrder(newArchiveList); // Call the async method to change order in the database
    return newArchiveList; // Return the new order for the state update
  },
);

export const modifyArchiveName = createAsyncThunk(
  "archives/modify",
  async (archive: ArchiveType) => {
    await modifyArchive(archive);
  },
);

export const deleteArchiveTh = createAsyncThunk(
  "archive/delete",
  async (archive: ArchiveType) => {
    await deleteArchive(archive._id);
    return archive._id;
  },
);

interface ArchiveListState {
  archiveList: ArchiveType[];
  refreshing: boolean;
}

const initialState: ArchiveListState = {
  archiveList: [] as ArchiveType[],
  refreshing: false,
};

const archiveListSlice = createSlice({
  name: "archives",
  initialState: initialState,
  reducers: {
    setRefreshing: (state, action) => {
      state.refreshing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArchiveList.fulfilled, (state, action) => {
      state.archiveList = action.payload;
    });
    builder.addCase(createNewArchive.fulfilled, (state, action) => {
      state.archiveList.push(action.payload);
    });
    builder.addCase(changeArchiveListOrder.fulfilled, (state, action) => {
      // Update the state with the new order
      state.archiveList = state.archiveList.sort(
        (a, b) => action.payload.indexOf(a._id) - action.payload.indexOf(b._id),
      );
    });
    builder.addCase(deleteArchiveTh.fulfilled, (state, action) => {
      state.archiveList = state.archiveList.filter(
        (archive) => action.payload !== archive._id,
      );
    });
    builder.addCase(modifyArchiveName.fulfilled, (state, action) => {});
  },
  selectors: {
    archiveListSelector: (state) => state.archiveList,
    refreshingSelector: (state) => state.refreshing,
  },
});

export const archiveListThunk = {
  fetchArchiveList,
  createNewArchive,
  changeArchiveListOrder,
  modifyArchiveName,
  deleteArchiveTh,
};
export const archiveListSelector = archiveListSlice.selectors;
export const archiveListAction = archiveListSlice.actions;
export default archiveListSlice.reducer;
