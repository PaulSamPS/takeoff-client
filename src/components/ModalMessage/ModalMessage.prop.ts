import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUserAll } from '../../interfaces/user.interface';

interface IUser {
  id: string | undefined;
  name: string;
  email: string;
  position: string;
  level: string;
  role: string;
  avatar: string;
  lastVisit: Date;
}

export interface ModalMessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friend: IUserAll | IUser | undefined;
  setModal: (close: boolean) => void;
  isModal: boolean;
}
