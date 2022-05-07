import { AppDispatch } from '../store';
import { $api } from '../../http/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';
import { registrationReducer } from '../reducers/auth/registrationReducer';
import { IRegistrationForm } from '../../interfaces/registrationForm.interface';
import { loginReducer } from '../reducers/auth/loginReducer';
import { IResponseUser } from '../../interfaces/user.interface';
import { ILoginForm } from '../../interfaces/loginForm.interface';

export const registration = (formData: IRegistrationForm) => async (dispatch: AppDispatch) => {
  dispatch(registrationReducer.actions.setLoading());
  await $api
    .post(`/api/user/registration`, formData)
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
    .post(`/api/user/login`, formData)
    .then((res: AxiosResponse<IResponseUser>) => {
      dispatch(loginReducer.actions.setStatusSuccess(res.status));
      dispatch(loginReducer.actions.setSuccess(res.data.user));
      localStorage.setItem('AccessToken', res.data.accessToken);
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(loginReducer.actions.setError(e.response?.data.message));
    });
};
