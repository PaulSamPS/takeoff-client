import { optionsCreator } from '../helpers/optionsCrearot';
import { ISelectOption } from '../interfaces/select.interface';

export const useLanguage = (): ISelectOption[] => {
  const language = [
    { _id: 0, city: 'Русский' },
    { _id: 1, city: 'Английский' },
  ];
  const optionsLanguage: ISelectOption[] = [];
  optionsCreator(language, optionsLanguage);

  return optionsLanguage;
};
