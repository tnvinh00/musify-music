import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { commentSlice } from './slices/commentSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [commentSlice.name]: commentSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      // serializableCheck: false,
    }),
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof makeStore>;