import { ISelectOption } from '../interfaces/select.interface';

interface IArr {
  _id: number;
  city?: string;
  value?: string;
}

export const optionsCreator = (arr: IArr[], options: ISelectOption[]) => {
  const a = arr.map((c) => (c.value ? (c.city = c.value) : c.city));
  for (let i = 0; i < arr.length; i++) {
    options.push(<ISelectOption>{ value: a[i], label: a[i] });
  }
};
