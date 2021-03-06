import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user.interface';

interface IRegistration {
  error: string | undefined;
  isLoading: boolean;
  users: IUser[];
}

const initialState: IRegistration = {
  error: '',
  isLoading: false,
  users: [],
};

export const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default usersReducer.reducer;
