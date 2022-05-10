import { AppDispatch } from '../store';
import { $apiAuth } from '../../http/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponseUser, IUser } from '../../interfaces/user.interface';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';
import { usersReducer } from '../reducers/usersReducer';
import { loginReducer } from '../reducers/auth/loginReducer';

export const getUsers = () => async (dispatch: AppDispatch) => {
  dispatch(usersReducer.actions.setLoading());
  await $apiAuth
    .get(`api/user`)
    .then((res: AxiosResponse<IUser[]>) => {
      dispatch(usersReducer.actions.setSuccess(res.data));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(usersReducer.actions.setError(e.response?.data.message));
    });
};

export const uploadAvatar = (id: number, formData: FormData) => async (dispatch: AppDispatch) => {
  await $apiAuth
    .post(`api/user/${id}/upload/avatar`, formData)
    .then((res: AxiosResponse<IResponseUser>) => {
      dispatch(loginReducer.actions.setSuccess(res.data.user));
    });
};

export const removeAvatar = (id: number, avatar: string) => async (dispatch: AppDispatch) => {
  await $apiAuth
    .post(`api/user/${id}/remove/avatar/${avatar}`)
    .then((res: AxiosResponse<IResponseUser>) => {
      dispatch(loginReducer.actions.setSuccess(res.data.user));
    });
};

export const removeUser = (id: number, avatar: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/user/${id}/remove/${avatar}`).then((res: AxiosResponse<IUser[]>) => {
    dispatch(usersReducer.actions.setSuccess(res.data));
  });
};
