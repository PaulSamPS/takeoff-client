import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from './postsReducer';
import { IUser } from '../../interfaces/user.interface';

interface INotification {
  _id: string;
  type: {
    type: string;
    enum: 'newLike' | 'newComment' | 'newFollower';
  };
  user: IUser;
  post: IPost;
  commentId: string;
  text: string;
  date: Date;
}

export interface INot {
  _id: string;
  user: IUser;
  notifications: INotification[];
}

export interface INotifications {
  notification: INot;
  error: string | undefined;
  isLoading: boolean;
}

const initialState: INotifications = {
  notification: {} as INot,
  isLoading: false,
  error: '',
};

export const notificationReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setSuccess(state, action: PayloadAction<INot>) {
      state.isLoading = false;
      state.error = '';
      state.notification = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default notificationReducer.reducer;
