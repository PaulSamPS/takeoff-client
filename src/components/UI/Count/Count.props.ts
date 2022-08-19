import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface CountProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
