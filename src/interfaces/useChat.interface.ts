import { IUserNotification } from './user.interface';

export interface IBanner {
  name: string | undefined;
  avatar: string | undefined;
  lastVisit?: Date | number;
  bio: { gender: string };
}

export interface IChats {
  avatar: string | null;
  date: Date | number;
  lastMessage: string;
  messagesWith: string;
  name: string;
  countUnreadMessages: number;
  lastVisit: Date | number;
}

export interface IChatLoadMore {
  chat: {
    countUnreadMessages: number;
    messages: IMessages[];
    messagesWith: IUserNotification;
    _id: string;
  };
}

export interface IMessages {
  message: string;
  sender: string;
  receiver: string;
  date: Date | number;
  _id: string;
}

export interface IReturn {
  messages: IMessages[];
  bannerData: IBanner;
  sendMessage: (message: string | null) => void;
  chats: IChats[];
  setChats: (chat: IChats[]) => void;
  deleteMessage: (messageId: string) => void;
  totalMessages: number;
  loadingMessages: boolean;
  loadingChats: boolean;
}
