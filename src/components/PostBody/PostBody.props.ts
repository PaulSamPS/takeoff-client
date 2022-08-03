import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPost } from '../../redux/reducers/postsReducer';

export interface PostBodyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
}
