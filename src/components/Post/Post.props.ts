import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPost } from '../../interfaces/usePost.interface';

export interface PostProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
  postModal?: boolean;
  setIsPostModal?: (click: boolean) => void;
  setVisibleNotification?: (click: boolean) => void;
}
