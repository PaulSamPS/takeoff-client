import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MobileSidebarType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModal: (click: boolean) => void;
  modal: boolean;
}
