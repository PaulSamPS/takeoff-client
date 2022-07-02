import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOpenChat {
  name: string;
  link: string;
  id: string;
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
      state.openChat = state.openChat
        .filter((f) => f.id !== action.payload.id)
        .concat(action.payload);
    },
    setResetOpenChat(state) {
      state.openChat = [];
    },
    deleteChat(state, action: PayloadAction<string>) {
      const indexOf = state.openChat.map((chat) => chat.id).indexOf(action.payload);
      state.openChat.splice(indexOf, 1);
    },
  },
});

export const { setOpenChat, setResetOpenChat, deleteChat } = openChatReducer.actions;

export default openChatReducer.reducer;
