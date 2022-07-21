import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser } from '../../interfaces/user.interface';

export interface PeopleFindCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}
