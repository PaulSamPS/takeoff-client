import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RightBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  arr: any[];
  firstItem: string;
  secondItem: string;
}
