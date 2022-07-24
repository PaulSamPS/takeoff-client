import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProfileMenuType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setVisibleMenu: (click: boolean) => void;
}
