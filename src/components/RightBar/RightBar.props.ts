import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IOpenChat {
  name: string;
  link: string;
}

export interface RightBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  arr: any[];
  firstItem: string;
  secondItem: string;
  firstItemLink: string;
  secondItemLink: string;
  openChat?: IOpenChat;
}
