import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOpenChat {
  name: string;
  link: string;
}

interface IOpenChatState {
  openChat: IOpenChat[];
}

const initialState: IOpenChatState = {
  openChat: [],
};

export const openChatReducer = createSlice({
  name: 'openChat',
  initialState,
  reducers: {
    setOpenChat(state, action: PayloadAction<IOpenChat>) {
      state.openChat = state.openChat.concat(action.payload);
    },
  },
});

export const { setOpenChat } = openChatReducer.actions;

export default openChatReducer.reducer;
