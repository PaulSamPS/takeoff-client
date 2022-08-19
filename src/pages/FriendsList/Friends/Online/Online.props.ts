import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser } from '../../../../interfaces/user.interface';

export interface OnlineProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friendsOnline: IUser[];
  friendsOnlineUser: IUser[];
}
