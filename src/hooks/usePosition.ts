import { optionsCreator } from '../helpers/optionsCrearot';
import { ISelectOption } from '../interfaces/select.interface';

export const useGender = (): ISelectOption[] => {
  const gender = [
    { _id: 0, city: 'Мужской' },
    { _id: 1, city: 'Женский' },
  ];
  const optionsGender: ISelectOption[] = [];
  optionsCreator(gender, optionsGender);

  return optionsGender;
};
