import { DetailedHTMLProps, HTMLAttributes } from 'react';
import {IPost} from '../../interfaces/usePost.interface';

export interface PostBodyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
}
