import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "@/slices/home/calendarSlice";
import archiveListReducer from "@/slices/archiveListSlice";
import homeNewRecordReducer from "@/slices/home/homeNewRecordSlice";
import archiveNewRecordReducer from "@/slices/archive/archiveNewRecordSlice";
import recordByArchiveReducer from "@/slices/archive/recordByArchiveSlice";
import devtoolsEnhancer from "redux-devtools-expo-dev-plugin";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    archives: archiveListReducer,
    "home-new-record": homeNewRecordReducer,
    "archive-new-record": archiveNewRecordReducer,
    "record-by-archive": recordByArchiveReducer,
  },
  devTools: false,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devtoolsEnhancer()),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
