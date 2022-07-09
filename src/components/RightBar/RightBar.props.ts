import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RightBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  totalUnviewed?: number;
  firstItem: string;
  secondItem: string;
  thirdItem?: string;
  firstItemLink: string;
  secondItemLink: string;
  thirdItemLink?: string;
  isFixed?: boolean;
  queryFirst?: string | null;
  querySecond?: string | null;
}
