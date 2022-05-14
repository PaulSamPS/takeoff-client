import { AppDispatch } from '../store';
import { $apiAuth } from '../../http/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponseUser, IUser } from '../../interfaces/user.interface';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';
import { usersReducer } from '../reducers/usersReducer';
import { loginReducer } from '../reducers/auth/loginReducer';
import { IEditProfileForm } from '../../interfaces/editProfile.interface';

export const getUsers = () => async (dispatch: AppDispatch) => {
  dispatch(usersReducer.actions.setLoading());
  await $apiAuth
    .get(`api/user`)
    .then((res: AxiosResponse<IUser[]>) => {
      dispatch(
        usersReducer.actions.setSuccess(
          res.data.sort((a, b) => {
            return a.id - b.id;
          })
        )
      );
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
      dispatch(getUsers());
    });
};

export const removeAvatar = (id: number, avatar: string) => async (dispatch: AppDispatch) => {
  await $apiAuth
    .post(`api/user/${id}/remove/avatar/${avatar}`)
    .then((res: AxiosResponse<IResponseUser>) => {
      dispatch(loginReducer.actions.setSuccess(res.data.user));
      dispatch(getUsers());
    });
};

export const removeUser = (id: number, avatar: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/user/${id}/remove/${avatar}`).then((res: AxiosResponse<IUser[]>) => {
    dispatch(usersReducer.actions.setSuccess(res.data));
  });
};

export const updateUser =
  (id: number, formData: IEditProfileForm) => async (dispatch: AppDispatch) => {
    await $apiAuth
      .post(`api/user/${id}/update`, formData)
      .then((res: AxiosResponse<IResponseUser>) => {
        dispatch(loginReducer.actions.setSuccess(res.data.user));
        dispatch(getUsers());
      });
  };

export const adminUpdateUser =
  (id: number, formData: IEditProfileForm) => async (dispatch: AppDispatch) => {
    await $apiAuth.post(`api/user/${id}/update`, formData).then(() => {
      dispatch(getUsers());
    });
  };

export const adminUploadAvatar =
  (id: number, formData: FormData) => async (dispatch: AppDispatch) => {
    await $apiAuth.post(`api/user/${id}/upload/avatar`, formData).then(() => {
      dispatch(getUsers());
    });
  };

export const adminRemoveAvatar = (id: number, avatar: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/user/${id}/remove/avatar/${avatar}`).then(() => {
    dispatch(getUsers());
  });
};
