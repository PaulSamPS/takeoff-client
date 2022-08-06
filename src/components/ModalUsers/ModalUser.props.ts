import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ModalUserProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setFriendsModal: (click: boolean) => void;
}
