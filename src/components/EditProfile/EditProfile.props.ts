import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface EditProfileProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setIsOpen: (click: boolean) => void;
  isOpen: boolean;
  adminUser?: string;
}
