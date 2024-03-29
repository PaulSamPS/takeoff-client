import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPost } from '../../../../../interfaces/usePost.interface';

export interface NewsItemBodyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
  hoverPost: boolean;
}
