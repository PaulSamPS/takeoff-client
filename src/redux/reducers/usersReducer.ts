import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserAll } from '../../interfaces/user.interface';

interface IRegistration {
  error: string | undefined;
  isLoading: boolean;
  users: IUserAll[];
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
    setSuccess(state, action: PayloadAction<IUserAll[]>) {
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
