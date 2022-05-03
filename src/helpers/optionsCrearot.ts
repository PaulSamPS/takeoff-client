import { ISelectOption } from '../interfaces/select.interface';

interface IArr {
  id: number;
  name: string;
}

export const optionsCreator = (arr: IArr[], options: ISelectOption[]) => {
  const a = arr.map((c) => c.name);
  for (let i = 0; i < arr.length; i++) {
    options.push({ value: a[i], label: a[i] });
  }
};
