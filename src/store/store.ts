import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { musicSlice } from './slices/musicSlice';
import { playerSlice } from './slices/playerSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [musicSlice.name]: musicSlice.reducer,
      [playerSlice.name]: playerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      // serializableCheck: false,
    }),
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof makeStore>;

export type AppDispatch = typeof makeStore extends () => infer R ? R extends { dispatch: infer D } ? D : never : never;