import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPost } from '../../interfaces/usePost.interface';

export interface ModalPostProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
}
