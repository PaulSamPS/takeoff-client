import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProfilePostProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLoadingUserInfo: boolean;
}
