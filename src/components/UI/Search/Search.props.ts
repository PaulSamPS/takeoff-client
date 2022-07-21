import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SearchProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setText: (search: string) => void;
}
