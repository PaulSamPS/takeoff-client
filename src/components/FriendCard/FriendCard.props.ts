import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser } from '../../interfaces/user.interface';

export interface FriendCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friend: IUser;
}
