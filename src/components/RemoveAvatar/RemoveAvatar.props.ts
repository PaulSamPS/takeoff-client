import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RemoveAvatarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModal: (click: boolean) => void;
  modal: boolean;
  setDeleteUser?: (click: boolean) => void;
  deleteUser?: boolean;
  userId: string;
  avatar: string;
}
