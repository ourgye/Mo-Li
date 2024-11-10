import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "@/slices/home/calendarSlice";
import homeNewRecordReducer from "@/slices/home/homeNewRecordSlice";
import archiveListReducer from "@/slices/archiveListSlice";
import archiveNewRecordReducer from "@/slices/archive/archiveNewRecordSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    "home-new-record": homeNewRecordReducer,
    "archive-new-records": archiveNewRecordReducer,
    archives: archiveListReducer,
  },
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
