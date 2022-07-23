import { ISelectOption } from '../../interfaces/select.interface';
import { optionsCreator } from '../optionsCrearot';
import { days, months, years } from '../selectData';

export const day = (): ISelectOption[] => {
  const optionsDay: ISelectOption[] = [];
  optionsCreator(days, optionsDay);

  return optionsDay;
};

export const month = (): ISelectOption[] => {
  const optionsMonth: ISelectOption[] = [];
  optionsCreator(months, optionsMonth);

  return optionsMonth;
};

export const year = (): ISelectOption[] => {
  const optionsYear: ISelectOption[] = [];
  optionsCreator(years, optionsYear);

  return optionsYear;
};
