import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IBanner, IMessages } from '../../interfaces/useChat.interface';

export interface ChatMessagesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  message: IMessages;
  bannerData: IBanner;
  deleteMessage: (messageId: string) => void;
}
