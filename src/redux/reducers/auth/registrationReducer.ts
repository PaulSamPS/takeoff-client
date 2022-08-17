import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRegistration {
  error: string | undefined;
  isLoading: boolean;
}

const initialState: IRegistration = {
  error: '',
  isLoading: false,
};

export const registrationReducer = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setSuccess(state) {
      state.isLoading = false;
      state.error = '';
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default registrationReducer.reducer;
