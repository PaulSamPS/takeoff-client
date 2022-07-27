import { AppDispatch } from '../store';
import { $apiAuth } from '../../http/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';
import { INot, notificationReducer } from '../reducers/notificationReducer';

export const getNotifications = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(notificationReducer.actions.setLoading());
  await $apiAuth
    .get(`api/user/notifications/${id}`)
    .then((res: AxiosResponse<INot>) => {
      dispatch(notificationReducer.actions.setSuccess(res.data));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(notificationReducer.actions.setError(e.response?.data.message));
    });
};
