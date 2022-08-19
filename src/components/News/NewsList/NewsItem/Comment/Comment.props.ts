import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPost } from '../../../../../interfaces/usePost.interface';

export interface NewsItemCommentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
  setIsAllComments: (click: boolean) => void;
  isAllComments: boolean;
}
