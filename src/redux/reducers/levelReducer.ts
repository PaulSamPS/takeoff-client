import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILevelInterface } from '../../interfaces/level.interface';

interface ILevel {
  level: ILevelInterface[];
}

const initialState: ILevel = {
  level: [],
};

export const levelReducer = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setLevelSuccess(state, action: PayloadAction<ILevelInterface[]>) {
      state.level = action.payload;
    },
  },
});

export default levelReducer.reducer;
