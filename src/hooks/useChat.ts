import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { getChatUser } from '../redux/actions/chatAction';
import { filteredChats } from '../helpers/filteChats';
import { io, Socket } from 'socket.io-client';
import { API_URL_WS } from '../http/axios';

interface IBanner {
  name: string | undefined;
  avatar: string | undefined;
}

// interface IMessagesWith {
//   _id: string;
//   name: string;
//   email: string;
//   position: string;
//   level: string;
//   role: string;
//   avatar: string;
//   unreadMessage: boolean;
//   countUnreadMessages: number;
//   lastVisit: Date;
//   isOnline: boolean;
// }

// interface IMessages {
//   message: string;
//   sender: string;
//   receiver: string;
//   date: Date;
//   _id: string;
// }

// interface IChat {
//   chat: {
//     messagesWith: IMessagesWith;
//     messages: IMessages[];
//   };
// }

interface INewMessage {
  newMessage: {
    sender: string;
    receiver: string;
    message: string;
    date: Date;
  };
}

interface IChatToBoSent {
  chatsToBeSent: {
    messagesWith: string;
    name: string;
    avatar: string;
    lastMessage: string;
    date: string;
    countUnreadMessages: number;
  };
}

interface IOnlineUsers {
  userId: string;
  socketId: string;
}

interface IUsers {
  users: IOnlineUsers[];
}

export const useChat = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const { conversation } = useAppSelector((state) => state.conversationReducer);
  const [users, setUsers] = React.useState<IOnlineUsers[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [bannerData, setBannerData] = React.useState<IBanner>({
    name: '',
    avatar: '',
  });
  const openChatId = React.useRef<string | null>('');
  const [chats, setChats] = React.useState<any>(conversation);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingMessages, setLoadingMessages] = React.useState<boolean>(true);
  const _id = localStorage.getItem('id');
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket>();

  React.useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_URL_WS, { transports: ['websocket'] });
    }
    socketRef.current?.emit('user:add', { userId: user.id });
    socketRef.current?.on('user_list:update', ({ users }: IUsers) => {
      setUsers(users);
    });
  }, []);

  React.useEffect(() => {
    socketRef.current?.emit('chat:get', { userId: user.id });
    socketRef.current?.on('chat:send', ({ chatsToBeSent }: IChatToBoSent) => {
      setChats(chatsToBeSent);
      setLoading(false);
    });
  }, [chats]);

  React.useEffect(() => {
    socketRef.current?.emit('messages:get', {
      userId: user.id,
      messagesWith: _id,
    });

    socketRef.current?.on('message_list:update', ({ chat }: any) => {
      setMessages(chat.messages.slice(-20));
      setBannerData({
        name: chat.messagesWith.name,
        avatar: chat.messagesWith.avatar,
      });
      openChatId.current = chat.messagesWith._id;
      setLoadingMessages(false);
    });

    socketRef.current?.on('chat:notFound', () => {
      setMessages([]);
      openChatId.current = _id;
    });
  }, [messages]);

  const sendMessage = (message: string) => {
    socketRef.current?.emit('message:add', {
      userId: user.id,
      msgSendToUserId: _id,
      message,
    });
  };

  React.useEffect(() => {
    socketRef.current?.on('messages:sent', ({ newMessage }: INewMessage) => {
      if (newMessage.receiver === _id) {
        setMessages((prev: any) => [...prev, newMessage]);
        setChats((prev: IChatToBoSent[]) => {
          const receiver = newMessage.receiver;
          filteredChats(prev, newMessage, receiver);
          return [...prev];
        });
      }
    });

    socketRef.current?.on('message:received', async ({ newMessage }: INewMessage) => {
      if (newMessage.sender === _id) {
        setMessages((prev) => [...prev, newMessage]);
        setChats((prev: IChatToBoSent[]) => {
          filteredChats(prev, newMessage);
          return [...prev];
        });
      } else {
        const ifPreviouslyMessaged =
          chats.filter((chat: any) => chat.messagesWith === newMessage.sender).length > 0;

        if (ifPreviouslyMessaged) {
          setChats((prev: IChatToBoSent[]) => {
            const { previousChat } = filteredChats(prev, newMessage);
            console.log(previousChat);
            return [
              previousChat,
              ...prev.filter((chat: any) => chat.messagesWith !== newMessage.sender),
            ];
          });
        } else {
          const user = await dispatch(getChatUser(newMessage.sender));
          setBannerData({ name: user?.name, avatar: user?.avatar });

          const newChat = {
            messagesWith: newMessage.sender,
            name: user?.name,
            avatar: user?.avatar,
            lastMessage: newMessage.message,
            date: newMessage.date,
          };
          setChats((prev: any) => [
            newChat,
            ...prev.filter((chat: any) => chat.messagesWith !== newMessage.sender),
          ]);
        }
      }
    });
  }, []);

  const deleteMessage = (messageId: string) => {
    socketRef.current?.emit('message:delete', {
      userId: user.id,
      messagesWith: _id,
      messageId,
    });

    socketRef.current?.on('message:deleted', () => {
      setMessages((prev) => prev.filter((message) => message._id !== messageId));
    });
  };

  return {
    users,
    user,
    messages,
    bannerData,
    sendMessage,
    chats,
    setChats,
    deleteMessage,
    loading,
    loadingMessages,
    socketRef,
  };
};
