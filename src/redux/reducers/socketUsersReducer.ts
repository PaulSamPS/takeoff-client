import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOnlineUsers {
  userId: string | undefined;
  socketId: string;
}

interface IUsers {
  users: IOnlineUsers[];
}

const initialState: IUsers = {
  users: [],
};

export const socketUsersReducer = createSlice({
  name: 'socketUsers',
  initialState,
  reducers: {
    setSocketUsers(state, action: PayloadAction<IOnlineUsers[]>) {
      state.users = action.payload;
    },
  },
});

export const { setSocketUsers } = socketUsersReducer.actions;

export default socketUsersReducer.reducer;
