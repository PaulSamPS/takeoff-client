import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser, IUserNotification } from '../../interfaces/user.interface';

export interface ModalMessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friend: IUserNotification | IUser | undefined;
  setModal: (close: boolean) => void;
  isModal: boolean;
}
