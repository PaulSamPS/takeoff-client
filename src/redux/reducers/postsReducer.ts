import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IPost} from '../../interfaces/usePost.interface';

interface IPostResponse {
  posts: IPost[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IPostResponse = {
  posts: [],
  isLoading: false,
  error: '',
};

export const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setSuccess(state, action: PayloadAction<IPost[]>) {
      state.isLoading = false;
      state.error = '';
      state.posts = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setSuccess } = postsReducer.actions;

export default postsReducer.reducer;
