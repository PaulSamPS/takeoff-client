import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOnlineUsers {
  userId: string;
  socketId: string;
}

interface IUsers {
  onlineUsers: IOnlineUsers[];
}

const initialState: IUsers = {
  onlineUsers: [],
};

export const onlineUsersReducer = createSlice({
  name: 'onlineUsers',
  initialState,
  reducers: {
    setOnlineUsers(state, action: PayloadAction<IOnlineUsers[]>) {
      state.onlineUsers = action.payload;
    },
  },
});
export const { setOnlineUsers } = onlineUsersReducer.actions;
export default onlineUsersReducer.reducer;
