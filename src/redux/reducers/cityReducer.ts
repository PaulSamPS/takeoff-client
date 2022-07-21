import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICityInterface } from '../../interfaces/city.interface';

interface ICity {
  city: ICityInterface[];
}

const initialState: ICity = {
  city: [],
};

export const cityReducer = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setLevelSuccess(state, action: PayloadAction<ICityInterface[]>) {
      state.city = action.payload;
    },
  },
});

export default cityReducer.reducer;
