import { optionsCreator } from '../optionsCrearot';
import { ISelectOption } from '../../interfaces/select.interface';

export const useGender = (): ISelectOption[] => {
  const gender = [
    { _id: 0, value: 'Мужской' },
    { _id: 1, value: 'Женский' },
  ];
  const optionsGender: ISelectOption[] = [];
  optionsCreator(gender, optionsGender);

  return optionsGender;
};
