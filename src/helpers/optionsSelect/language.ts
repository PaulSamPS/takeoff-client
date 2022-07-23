import { optionsCreator } from '../optionsCrearot';
import { ISelectOption } from '../../interfaces/select.interface';

export const useLanguage = (): ISelectOption[] => {
  const language = [
    { _id: 0, value: 'Русский' },
    { _id: 1, value: 'Английский' },
  ];
  const optionsLanguage: ISelectOption[] = [];
  optionsCreator(language, optionsLanguage);

  return optionsLanguage;
};
