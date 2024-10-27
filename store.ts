import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "@/slices/home/calendarSlice";
import homeNewRecordSlice from "@/slices/home/homeNewRecordSlice";
import archiveSlice from "@/slices/archive/archiveSlice";
import archiveNewRecordSlice from "@/slices/archive/archiveNewRecordSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    homeRecord: homeNewRecordSlice,
    archiveRecord: archiveNewRecordSlice,
    archive: archiveSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>