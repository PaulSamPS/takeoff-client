import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ModalChangeAvatarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModal: (click: boolean) => void;
  userId: string;
}
