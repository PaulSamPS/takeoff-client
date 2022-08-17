import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INotification } from '../../interfaces/useNotifications.interface';

export interface NotificationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notification: INotification;
  setVisibleNotification?: (click: boolean) => void;
}
