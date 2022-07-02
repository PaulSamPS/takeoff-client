import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RightBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  totalUnviewed: number;
  firstItem: string;
  secondItem: string;
  firstItemLink: string;
  secondItemLink: string;
  isFixed?: boolean;
}
