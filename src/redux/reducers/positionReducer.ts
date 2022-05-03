import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPositionInterface } from '../../interfaces/position.interface';

interface IPosition {
  position: IPositionInterface[];
}

const initialState: IPosition = {
  position: [],
};

export const positionReducer = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setPositionSuccess(state, action: PayloadAction<IPositionInterface[]>) {
      state.position = action.payload;
    },
  },
});

export default positionReducer.reducer;
