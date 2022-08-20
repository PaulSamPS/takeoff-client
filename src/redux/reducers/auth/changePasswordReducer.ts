import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IChangePassword {
  error: string | undefined;
  success: string | undefined;
}

const initialState: IChangePassword = {
  error: '',
  success: '',
};

export const changePassword = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    setSuccess(state, action: PayloadAction<string | undefined>) {
      state.error = '';
      state.success = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.success = '';
      state.error = action.payload;
    },
    setStateDefault(state) {
      state.success = '';
      state.error = '';
    },
  },
});

export const { setStateDefault } = changePassword.actions;

export default changePassword.reducer;
