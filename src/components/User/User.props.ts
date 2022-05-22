import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUserAll } from '../../interfaces/user.interface';

export interface UserProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUserAll;
}
