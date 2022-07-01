import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICount {
  count: number;
}

const initialState: ICount = {
  count: 0,
};

export const countReducer = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCount(state, action: PayloadAction<any>) {
      state.count = action.payload
        .map((chat: any) => chat.countUnreadMessages)
        .reduce((sum: number, elem: any) => {
          return sum + elem;
        }, 0);
    },
  },
});

export const { setCount } = countReducer.actions;

export default countReducer.reducer;
