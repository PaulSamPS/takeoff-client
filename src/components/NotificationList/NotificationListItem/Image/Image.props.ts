import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INotification } from '../../../../interfaces/useNotifications.interface';

export interface ImageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notification: INotification;
}
