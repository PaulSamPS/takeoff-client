import React from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { getChatUser } from '../redux/actions/chatAction';
import { filteredChats } from '../helpers/filteChats';
import { socket } from '../helpers/socket';

interface IBanner {
  name: string | undefined;
  avatar: string | undefined;
}

interface IMessagesWith {
  _id: string;
  name: string;
  email: string;
  position: string;
  level: string;
  role: string;
  avatar: string;
  unreadMessage: boolean;
  countUnreadMessages: number;
  lastVisit: Date;
  isOnline: boolean;
}

interface IMessages {
  message: string;
  sender: string;
  receiver: string;
  date: Date;
  _id: string;
}

interface IChat {
  chat: {
    messagesWith: IMessagesWith;
    messages: IMessages[];
  };
}

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
  const _id = localStorage.getItem('id');
  const dispatch = useAppDispatch();
  const [users, setUsers] = React.useState<IOnlineUsers[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [bannerData, setBannerData] = React.useState<IBanner>({
    name: '',
    avatar: '',
  });
  const openChatId = React.useRef<string | null>('');
  const [chats, setChats] = React.useState<any>(conversation);
  const [lastMessage, setLastMessage] = React.useState<any>();

  React.useEffect(() => {
    socket.emit('user:add', { userId: user.id });
    socket.on('user_list:update', ({ users }: IUsers) => {
      return setUsers(users);
    });
  }, []);

  React.useEffect(() => {
    socket.on('chat:send', ({ chatsToBeSent }: IChatToBoSent) => {
      setChats(chatsToBeSent);
      setLastMessage(chatsToBeSent);
    });

    socket.emit('messages:get', {
      userId: user.id,
      messagesWith: _id,
    });

    socket.emit('chat:get', { userId: user.id });

    socket.on('message:last', ({ newMessage }: INewMessage) => {
      console.log(newMessage);
    });

    socket.on('message_list:update', ({ chat }: IChat) => {
      setMessages(chat.messages.slice(-20));
      setBannerData({
        name: chat.messagesWith.name,
        avatar: chat.messagesWith.avatar,
      });
      openChatId.current = chat.messagesWith._id;
    });

    socket.on('chat:notFound', () => {
      setMessages([]);
      openChatId.current = _id;
    });
  }, []);

  const sendMessage = (message: string) => {
    socket.emit('message:add', {
      userId: user.id,
      msgSendToUserId: _id,
      message,
    });
  };

  React.useEffect(() => {
    socket.on('messages:sent', ({ newMessage }: INewMessage) => {
      if (newMessage.receiver === _id) {
        setMessages((prev: any) => [...prev, newMessage]);
        setChats((prev: IChatToBoSent[]) => {
          const receiver = newMessage.receiver;
          const { previous } = filteredChats(prev, newMessage, receiver);
          return [...previous];
        });
        setLastMessage((prev: IChatToBoSent[]) => {
          const receiver = newMessage.receiver;
          filteredChats(prev, newMessage, receiver);
          return [...prev];
        });
      }
    });

    socket.on('message:received', async ({ newMessage }: INewMessage) => {
      if (newMessage.sender === _id) {
        setMessages((prev) => [...prev, newMessage]);
        setChats((prev: IChatToBoSent[]) => {
          const { previous } = filteredChats(prev, newMessage);
          return [...previous];
        });
        setLastMessage((prev: IChatToBoSent[]) => {
          filteredChats(prev, newMessage);
          return [...prev];
        });
      } else {
        const ifPreviouslyMessaged =
          chats.filter((chat: any) => chat.messagesWith === newMessage.sender).length > 0;

        if (ifPreviouslyMessaged) {
          setChats((prev: IChatToBoSent[]) => {
            const { previousChat, previous } = filteredChats(prev, newMessage);
            return [
              previousChat,
              ...previous.filter((chat: any) => chat.messagesWith !== newMessage.sender),
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
          setChats((prev: any) => [newChat, ...prev]);
        }
      }
    });
  }, []);

  return { users, user, messages, bannerData, sendMessage, chats, lastMessage };
};
