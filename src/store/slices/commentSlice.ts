import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export type State = {
  value: {
    comment: string;
    username: string;
  }[];
};

const initialState: State = {
  value: [
    {
      comment: 'Gojo looks nice. Excellent work amigo!',
      username: 'Saitama',
    },
    {
      comment: 'Catoru Sensei! Konnichiwa!',
      username: 'Yuji',
    },
  ],
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // Action to add comment
    addComment: (state, action) => {
      state.value = [...state.value, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // @ts-ignore - TS doesn't know about HYDRATE
        ...action.payload.comments,
      };
    });
  },
});

export const { addComment } = commentSlice.actions;
export const selectComments = (state: { comments: State }) => state.comments.value;
export default commentSlice.reducer;