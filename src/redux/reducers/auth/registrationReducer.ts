import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRegistration {
  error: string | undefined;
  isLoading: boolean;
  status: number;
}

const initialState: IRegistration = {
  error: '',
  isLoading: false,
  status: 0,
};

export const registrationReducer = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setSuccess(state, action: PayloadAction<number>) {
      state.isLoading = false;
      state.error = '';
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default registrationReducer.reducer;
