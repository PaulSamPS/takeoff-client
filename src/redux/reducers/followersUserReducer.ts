import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user.interface';

interface IFriendsUserInfo {
  followers: IUser[];
}

const initialState: IFriendsUserInfo = {
  followers: [],
};

export const followersUserReducer = createSlice({
  name: 'followersUser',
  initialState,
  reducers: {
    setFollowersUser(state, action: PayloadAction<IUser[]>) {
      state.followers = action.payload;
    },
  },
});

export const { setFollowersUser } = followersUserReducer.actions;

export default followersUserReducer.reducer;
