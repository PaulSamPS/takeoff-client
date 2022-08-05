import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ButtonFriendProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  userId: string | undefined;
}
