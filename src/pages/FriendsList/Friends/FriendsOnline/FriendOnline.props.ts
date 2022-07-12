import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IUser {
  id: string | undefined;
  name: string;
  email: string;
  position: string;
  level: string;
  role: string;
  avatar: string;
  lastVisit: Date;
  isOnline: boolean;
}

export interface FriendOnlineProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friendsOnline: IUser[];
}
