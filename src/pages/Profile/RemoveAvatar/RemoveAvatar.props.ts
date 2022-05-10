import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RemoveAvatarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModal: (click: boolean) => void;
  modal: boolean;
  userId: number;
  avatar: string;
}
