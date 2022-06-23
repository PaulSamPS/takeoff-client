import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPost } from '../../redux/reducers/postsReducer';

export interface PostProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
}
