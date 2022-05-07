import { AppDispatch } from '../store';
import { $apiAuth } from '../../http/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { IUser } from '../../interfaces/user.interface';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';
import { usersReducer } from '../reducers/usersReducer';

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
