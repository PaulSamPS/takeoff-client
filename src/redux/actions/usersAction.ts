import { AppDispatch } from '../store';
import { $apiAuth } from '../../http/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponseUser, IUser } from '../../interfaces/user.interface';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';
import { usersReducer } from '../reducers/usersReducer';
import { loginReducer } from '../reducers/auth/loginReducer';
import { IEditProfile } from '../../interfaces/editProfile.interface';

export const getUsers = (search?: string) => async (dispatch: AppDispatch) => {
  dispatch(usersReducer.actions.setLoading());
  await $apiAuth
    .post(`api/user`, { search })
    .then((res: AxiosResponse<IUser[]>) => {
      dispatch(usersReducer.actions.setSuccess(res.data));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(usersReducer.actions.setError(e.response?.data.message));
    });
};

export const uploadAvatar = (id: string, formData: FormData) => async (dispatch: AppDispatch) => {
  await $apiAuth
    .post(`api/user/${id}/upload/avatar`, formData)
    .then((res: AxiosResponse<IResponseUser>) => {
      dispatch(loginReducer.actions.setSuccess(res.data.user));
      dispatch(getUsers());
    });
};

export const removeAvatar = (id: string, avatar: string) => async (dispatch: AppDispatch) => {
  await $apiAuth
    .post(`api/user/${id}/remove/avatar/${avatar}`)
    .then((res: AxiosResponse<IResponseUser>) => {
      dispatch(loginReducer.actions.setSuccess(res.data.user));
      dispatch(getUsers());
    });
};

export const removeUser = (id: string, avatar: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/user/${id}/remove/${avatar}`).then((res: AxiosResponse<IUser[]>) => {
    dispatch(usersReducer.actions.setSuccess(res.data));
  });
};

export const updateUser = (id: string, formData: IEditProfile) => async (dispatch: AppDispatch) => {
  await $apiAuth
    .post(`api/user/update/${id}`, formData)
    .then((res: AxiosResponse<IResponseUser>) => {
      dispatch(loginReducer.actions.setSuccess(res.data.user));
      dispatch(getUsers());
    });
};

export const adminUploadAvatar =
  (id: string, formData: FormData) => async (dispatch: AppDispatch) => {
    await $apiAuth.post(`api/user/${id}/upload/avatar`, formData).then(() => {
      dispatch(getUsers());
    });
  };

export const adminRemoveAvatar = (id: string, avatar: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/user/${id}/remove/avatar/${avatar}`).then(() => {
    dispatch(getUsers());
  });
};

export const deleteAccount = (userId: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post('api/user/delete', { userId });
};
