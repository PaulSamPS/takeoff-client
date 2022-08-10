import { AppDispatch } from '../store';
import { AxiosError, AxiosResponse } from 'axios';
import { $api } from '../../http/axios';
import { cityReducer } from '../reducers/cityReducer';
import { ICityInterface } from '../../interfaces/city.interface';

export const getCity = () => async (dispatch: AppDispatch) => {
  await $api
    .get(`api/auth/cities`)
    .then((res: AxiosResponse<ICityInterface[]>) => {
      dispatch(cityReducer.actions.setLevelSuccess(res.data));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    });
};
