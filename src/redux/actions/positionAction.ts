import { AppDispatch } from '../store';
import { positionReducer } from '../reducers/positionReducer';
import { AxiosError, AxiosResponse } from 'axios';
import { $api } from '../../http/axios';
import { IPositionInterface } from '../../interfaces/position.interface';
import { levelReducer } from '../reducers/levelReducer';
import { ILevelInterface } from '../../interfaces/level.interface';

export const getPosition = () => async (dispatch: AppDispatch) => {
  await $api
    .get(`/api/position`)
    .then((res: AxiosResponse<IPositionInterface[]>) => {
      dispatch(positionReducer.actions.setPositionSuccess(res.data));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    });
};

export const getLevel = () => async (dispatch: AppDispatch) => {
  await $api
    .get(`/api/level`)
    .then((res: AxiosResponse<ILevelInterface[]>) => {
      dispatch(levelReducer.actions.setLevelSuccess(res.data));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    });
};
