import React from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { getChatUser } from '../redux/actions/chatAction';
import { filteredChats } from '../helpers/filteChats';
import { SocketContext } from '../helpers/context';
import { useParams } from 'react-router-dom';

interface IBanner {
  name: string | undefined;
  avatar: string | undefined;
  lastVisit?: Date | number;
  isOnline?: boolean;
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
    date: Date | null;
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

export const useChat = () => {
  const socket = React.useContext(SocketContext);
  const { user } = useAppSelector((state) => state.loginReducer);
  const { conversation } = useAppSelector((state) => state.conversationReducer);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [messages, setMessages] = React.useState<any[]>([]);
  const [bannerData, setBannerData] = React.useState<IBanner>({
    name: '',
    avatar: '',
    lastVisit: 0,
    isOnline: false,
  });

  const openChatId = React.useRef<string | null>('');
  const [chats, setChats] = React.useState<any>(conversation);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingMessages, setLoadingMessages] = React.useState<boolean>(true);

  React.useEffect(() => {
    socket?.emit('chat:get', { userId: user.id });
    socket?.on('chat:send', ({ chatsToBeSent }: IChatToBoSent) => {
      setChats(chatsToBeSent);
      setLoading(false);
    });
    return () => {
      socket?.off('chat:send');
    };
  }, [socket, window.location.pathname]);

  React.useEffect(() => {
    socket?.emit('messages:get', {
      userId: user.id,
      messagesWith: id,
    });

    socket?.on('message_list:update', ({ chat }: any) => {
      setMessages(chat.messages.slice(-20));
      setBannerData({
        name: chat.messagesWith.name,
        avatar: chat.messagesWith.avatar,
        lastVisit: chat.messagesWith.lastVisit,
        isOnline: chat.messagesWith.isOnline,
      });
      openChatId.current = chat.messagesWith._id;
      setLoadingMessages(false);
    });

    socket?.on('chat:notFound', () => {
      setMessages([]);
    });
    return () => {
      socket?.off('message_list:update');
      socket?.off('chat:notFound');
    };
  }, [socket, window.location.pathname]);

  const sendMessage = (message: string | null) => {
    socket?.emit('message:add', {
      sender: user.id,
      receiver: id,
      message,
    });
  };

  React.useEffect(() => {
    socket?.on('messages:sent', ({ newMessage }: INewMessage) => {
      if (newMessage.receiver === id) {
        setMessages((prev: any) => [...prev, newMessage]);
        setChats((prev: IChatToBoSent[]) => {
          const receiver = newMessage.receiver;
          filteredChats(prev, newMessage, receiver);
          return [...prev];
        });
      }
    });

    socket?.on('message:received', async ({ newMessage }: INewMessage) => {
      if (newMessage.sender === id) {
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
  }, [socket]);

  const deleteMessage = (messageId: string) => {
    socket?.emit('message:delete', {
      userId: user.id,
      messagesWith: id,
      messageId,
    });

    socket?.on('message:deleted', () => {
      setMessages((prev) => prev.filter((message) => message._id !== messageId));
    });
  };

  return {
    user,
    messages,
    bannerData,
    sendMessage,
    chats,
    setChats,
    deleteMessage,
    loading,
    loadingMessages,
  };
};
