import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commonReducer from './modules/common';

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
