import React from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { ISelectOption } from '../interfaces/select.interface';
import { optionsCreator } from '../helpers/optionsCrearot';
import { getCity } from '../redux/actions/positionAction';

export const useCity = (): ISelectOption[] => {
  const { city } = useAppSelector((state) => state.cityReducer);
  const dispatch = useAppDispatch();

  const optionsCity: ISelectOption[] = [];
  optionsCreator(city, optionsCity);

  React.useEffect(() => {
    dispatch(getCity());
  }, []);

  return optionsCity;
};
