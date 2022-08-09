import { AppDispatch } from '../store';
import { $api, API_URL } from '../../http/axios';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';
import { registrationReducer } from '../reducers/auth/registrationReducer';
import { IRegistrationForm } from '../../interfaces/registrationForm.interface';
import { loginReducer } from '../reducers/auth/loginReducer';
import { IResponseUser, IUser } from '../../interfaces/user.interface';
import { ILoginForm } from '../../interfaces/loginForm.interface';
import { setResetOpenChat } from '../reducers/openChatReducer';

export const registration = (formData: IRegistrationForm) => async (dispatch: AppDispatch) => {
  dispatch(registrationReducer.actions.setLoading());
  await $api
    .post(`api/auth/registration`, formData)
    .then((res: AxiosResponse) => {
      dispatch(registrationReducer.actions.setSuccess(res.status));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(registrationReducer.actions.setError(e.response?.data.message));
    });
};

export const login = (formData: ILoginForm) => async (dispatch: AppDispatch) => {
  dispatch(loginReducer.actions.setLoading());
  await $api
    .post(`api/auth/login`, formData)
    .then((res: AxiosResponse<IResponseUser>) => {
      dispatch(loginReducer.actions.setSuccess(res.data.user));
      localStorage.setItem('AccessToken', 'Bearer ' + res.data.accessToken);
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(loginReducer.actions.setError(e.response?.data.message));
    });
};
interface IObj {
  userId: string;
  notification: boolean;
}

export const setSettings = (obj: IObj) => async (dispatch: AppDispatch) => {
  await $api.post(`api/auth/settings`, obj);
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(loginReducer.actions.setLoading());
  localStorage.clear();
  dispatch(setResetOpenChat());
  dispatch(loginReducer.actions.setSuccess({} as IUser));
};

export const refreshToken = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('AccessToken');
  await axios
    .get(`${API_URL}/api/auth/refresh`, { withCredentials: true })
    .then((res: AxiosResponse<IResponseUser>) => {
      localStorage.setItem('AccessToken', 'Bearer ' + res.data.accessToken);
      dispatch(loginReducer.actions.setSuccess(res.data.user));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    });
};
