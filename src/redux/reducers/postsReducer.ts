import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserPost {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

interface ILikes {
  _id: string;
  user: IUserPost;
}

interface ICommentsPost {
  _id: string;
  user: IUserPost;
  text: string;
  date: Date;
}

export interface IPost {
  _id: string;
  user: IUserPost;
  text: string;
  image: string | null;
  likes: ILikes[];
  comments: ICommentsPost[];
  createdAt: Date;
  updatedAt: Date;
}

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

export default postsReducer.reducer;
