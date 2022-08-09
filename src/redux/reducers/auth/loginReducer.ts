import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/user.interface';

interface IRegistration {
  error: string | undefined;
  isLoading: boolean;
  user: IUser;
}

const initialState: IRegistration = {
  error: '',
  isLoading: false,
  user: {} as IUser,
};

export const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setNotificationMessage(state, action: PayloadAction<boolean>) {
      state.user.settings.notification.messagesToast = action.payload;
    },
  },
});

export const { setNotificationMessage } = loginReducer.actions;

export default loginReducer.reducer;
