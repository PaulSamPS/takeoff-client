import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IConversation {
  avtar: string | null;
  date: Date;
  lastMessage: string;
  messagesWith: string;
  name: string;
  countUnreadMessages: number;
}

interface IConv {
  conversation: IConversation[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IConv = {
  conversation: [],
  isLoading: false,
  error: '',
};

export const conversationReducer = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setSuccess(state, action: PayloadAction<IConversation[]>) {
      state.isLoading = false;
      state.error = '';
      state.conversation = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default conversationReducer.reducer;
