import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ChangeAvatarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModal: (click: boolean) => void;
  userId: string;
}
