import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ButtonFriendProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string | undefined;
}
