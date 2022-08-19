import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INotification } from '../../../interfaces/useNotifications.interface';

export interface NotificationListItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notification: INotification;
  setVisibleNotification?: (click: boolean) => void;
}
