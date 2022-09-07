import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user.interface';

interface IFriendsUserInfo {
  friendsUserInfo: IUser[];
}

const initialState: IFriendsUserInfo = {
  friendsUserInfo: [],
};

export const friendsUserInfoReducer = createSlice({
  name: 'friendsUserInfo',
  initialState,
  reducers: {
    setFriendsUserInfoReducer(state, action: PayloadAction<IUser[]>) {
      state.friendsUserInfo = action.payload;
    },
  },
});

export const { setFriendsUserInfoReducer } = friendsUserInfoReducer.actions;

export default friendsUserInfoReducer.reducer;
