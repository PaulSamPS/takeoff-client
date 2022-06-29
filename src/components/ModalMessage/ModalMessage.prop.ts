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
}

export interface ModalMessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friend: IUser;
  setModal: (close: boolean) => void;
}
