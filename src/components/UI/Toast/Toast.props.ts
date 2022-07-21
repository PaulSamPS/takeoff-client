import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ToastProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModal: (click: boolean) => void;
  modal: boolean;
  bannerData: any;
  newMessageReceived: any;
}
