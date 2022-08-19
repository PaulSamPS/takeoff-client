import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INotification } from '../../../../interfaces/useNotifications.interface';

export interface InfoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notification: INotification;
  offsetTop: number;
  coordsEl: () => void;
  setIsPostModal: (click: boolean) => void;
  setVisibleNotification?: (click: boolean) => void;
  handleFindPost: (postId: string) => void;
}
