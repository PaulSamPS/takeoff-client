import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser, IUserAll } from '../../interfaces/user.interface';

export interface InfoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUserAll | IUser | undefined;
}
