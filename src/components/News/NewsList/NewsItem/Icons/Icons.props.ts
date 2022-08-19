import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPost } from '../../../../../interfaces/usePost.interface';

export interface NewsItemIconsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
  setIsPostModal?: (click: boolean) => void;
  setVisibleNotification?: (click: boolean) => void;
  setIsAllComments: (click: boolean) => void;
  isAllComments: boolean;
  postModal: boolean | undefined;
}
