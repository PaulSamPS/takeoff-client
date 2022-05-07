import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/user.interface';

interface IRegistration {
  error: string | undefined;
  isLoading: boolean;
  user: IUser[];
  status: number;
}

const initialState: IRegistration = {
  error: '',
  isLoading: false,
  user: [],
  status: 0,
};

export const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    setStatusSuccess(state, action: PayloadAction<number>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default loginReducer.reducer;
