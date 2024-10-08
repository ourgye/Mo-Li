import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import CalendarReducer from "@/slices/calendarSlice";
import homeRecordSlice from "@/slices/homeRecordSlice";
import archiveSlice from "@/slices/archiveSlice";
import archiveRecordSlice from "@/slices/archiveRecordSlice";

export const store = configureStore({
  reducer: {
    calendar: CalendarReducer,
    homeRecord: homeRecordSlice,
    archiveRecord: archiveRecordSlice,
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