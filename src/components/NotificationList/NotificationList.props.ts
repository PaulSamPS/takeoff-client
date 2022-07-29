import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface NotificationListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setVisibleNotification: (click: boolean) => void;
}
