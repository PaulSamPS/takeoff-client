import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INotification } from '../../hooks/useNotifications';

export interface NotificationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notification: INotification;
}
