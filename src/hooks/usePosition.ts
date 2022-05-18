import React from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { getPosition } from '../redux/actions/positionAction';
import { optionsCreator } from '../helpers/optionsCrearot';
import { ISelectOption } from '../interfaces/select.interface';

export const usePosition = (): ISelectOption[] => {
  const { position } = useAppSelector((state) => state.positionReducer);
  const dispatch = useAppDispatch();

  const optionsPosition: ISelectOption[] = [];
  optionsCreator(position, optionsPosition);

  React.useEffect(() => {
    dispatch(getPosition());
  }, []);

  return optionsPosition;
};
