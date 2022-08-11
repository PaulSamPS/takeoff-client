import { DetailedHTMLProps, HTMLAttributes } from 'react';
import {IChats} from '../../interfaces/useChat.interface';

export interface MessagesCardProp
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  chat: IChats;
}
