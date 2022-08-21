import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser } from '../../../interfaces/user.interface';

export interface ProfileAvatarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser | undefined;
  isLoadingUserInfo: boolean;
}
