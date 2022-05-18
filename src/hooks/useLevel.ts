import { useAppDispatch, useAppSelector } from './redux';
import { ISelectOption } from '../interfaces/select.interface';
import { optionsCreator } from '../helpers/optionsCrearot';
import React from 'react';
import { getLevel } from '../redux/actions/positionAction';

export const useLevel = (): ISelectOption[] => {
  const { level } = useAppSelector((state) => state.levelReducer);
  const dispatch = useAppDispatch();

  const optionsLevel: ISelectOption[] = [];
  optionsCreator(level, optionsLevel);

  React.useEffect(() => {
    dispatch(getLevel());
  }, []);

  return optionsLevel;
};
