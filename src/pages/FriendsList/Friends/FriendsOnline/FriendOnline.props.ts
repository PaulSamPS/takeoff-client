import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser } from '../../../../interfaces/user.interface';

export interface FriendOnlineProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friendsOnline: IUser[];
}
