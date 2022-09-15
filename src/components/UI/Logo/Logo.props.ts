import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LogoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  justify: 'center' | 'flex-start';
}
