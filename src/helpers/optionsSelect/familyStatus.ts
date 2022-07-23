import { ISelectOption } from '../../interfaces/select.interface';
import { optionsCreator } from '../optionsCrearot';
import { useAppSelector } from '../../hooks/redux';

const familyStatusArr = [
  { _id: 0, value: 'Не женат' },
  { _id: 1, value: 'Женнат' },
  { _id: 2, value: 'Влюблен' },
  { _id: 3, value: 'В активном поиске' },
  { _id: 4, value: 'Замужем' },
  { _id: 5, value: 'Не замужем' },
  { _id: 6, value: 'Влюблена' },
];

export const familyStatus = (): ISelectOption[] => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const male = ['Не замужем', 'Замужем', 'Влюблена'];
  const female = ['Не женат', 'Женат', 'Влюблен'];

  const filteredStatus = familyStatusArr.filter((status) => {
    return loginUser.bio.gender === 'Мужской'
      ? !male.includes(status.value)
      : !female.includes(status.value);
  });

  const optionsFamilyStatus: ISelectOption[] = [];

  optionsCreator(filteredStatus, optionsFamilyStatus);

  return optionsFamilyStatus;
};
