import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INotification } from '../../../../interfaces/useNotifications.interface';

export interface AvatarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notification: INotification;
}
