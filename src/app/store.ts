import {configureStore} from '@reduxjs/toolkit';
import heroReducer from '../features/hero/heroSlice';

export const store = configureStore({
  reducer: {
    heroes: heroReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
