import { AppDispatch } from '../store';
import { positionReducer } from '../reducers/positionReducer';
import { AxiosError, AxiosResponse } from 'axios';
import { $api } from '../../http/axios';
import { IPositionInterface } from '../../interfaces/position.interface';
import { cityReducer } from '../reducers/cityReducer';
import { ICityInterface } from '../../interfaces/city.interface';

export const getPosition = () => async (dispatch: AppDispatch) => {
  await $api
    .get(`api/position`)
    .then((res: AxiosResponse<IPositionInterface[]>) => {
      dispatch(positionReducer.actions.setPositionSuccess(res.data));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    });
};

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
