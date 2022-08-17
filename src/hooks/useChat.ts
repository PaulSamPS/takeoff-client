import React from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { getChatUser } from '../redux/actions/chatAction';
import { filteredChats } from '../helpers/filteChats';
import { SocketContext } from '../helpers/socketContext';
import { useScroll } from './useScroll';
import { useParams } from 'react-router-dom';
import {
  IBanner,
  IChatLoadMore,
  IChats,
  IMessages,
  IReturn,
} from '../interfaces/useChat.interface';
import * as uuid from 'uuid';

const initialStateBannerData = {
  name: '',
  avatar: '',
  lastVisit: 0,
  bio: { gender: '' },
};

const initialStateChats = [
  {
    avatar: null,
    date: Date.now(),
    lastMessage: '',
    messagesWith: '',
    name: '',
    countUnreadMessages: 0,
    lastVisit: Date.now(),
  },
];

export const useChat = (): IReturn => {
  const socket = React.useContext(SocketContext);
  const { user } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();

  const [messages, setMessages] = React.useState<IMessages[]>([]);
  const [bannerData, setBannerData] = React.useState<IBanner>(initialStateBannerData);
  const [chats, setChats] = React.useState<IChats[]>(initialStateChats);
  const [loadingMessages, setLoadingMessages] = React.useState<boolean>(true);
  const [totalMessages, setTotalMessages] = React.useState<number>(0);
  const [currentCountMessages, setCurrentCountMessages] = React.useState<number>(20);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const { scrollY } = useScroll();
  const openChatId = React.useRef<string | null>('');
  const receiverUserId = localStorage.getItem('receiverUserId');
  const { id } = useParams();

  React.useEffect(() => {
    if (scrollY <= 0 && messages.length < totalMessages) {
      setCurrentCountMessages((prevState) => prevState + 20);
      setIsFetching(true);
    }
  }, [scrollY]);

  React.useEffect(() => {
    if (isFetching) {
      socket?.emit('messages:get', {
        userId: user.id,
        messagesWith: id,
      });

      socket?.on('message_list:update', ({ chat }: IChatLoadMore) => {
        setMessages(chat.messages.slice(-currentCountMessages));
        setLoadingMessages(false);
        setIsFetching(false);
        window.scrollTo({
          top: 700,
          behavior: 'smooth',
        });
      });
      return () => {
        socket?.off('message_list:update');
      };
    }
  }, [isFetching]);

  React.useEffect(() => {
    socket?.emit('chat:get', { userId: user.id });
    socket?.on('chat:send', ({ chatsToBeSent }: { chatsToBeSent: IChats[] }) => {
      setChats(chatsToBeSent);
    });
    return () => {
      socket?.off('chat:send');
    };
  }, [socket, id]);

  React.useEffect(() => {
    socket?.emit('messages:get', {
      userId: user.id,
      messagesWith: id,
    });

    socket?.on('message_list:update', ({ chat }: IChatLoadMore) => {
      setMessages(chat.messages.slice(-currentCountMessages));
      setBannerData({
        name: chat.messagesWith.name.firstName + ' ' + chat.messagesWith.name.lastName,
        avatar: chat.messagesWith.avatar,
        lastVisit: chat.messagesWith.lastVisit,
        bio: { gender: chat.messagesWith.bio.gender },
      });
      openChatId.current = chat.messagesWith._id;
      setTotalMessages(chat.messages.length);
      setLoadingMessages(false);
    });

    socket?.on('chat:notFound', () => {
      setMessages([]);
    });
    return () => {
      socket?.off('message_list:update');
      socket?.off('chat:notFound');
    };
  }, [socket, id]);

  const sendMessage = (message: string | null) => {
    socket?.emit('message:add', {
      _id: uuid.v4(),
      sender: user.id,
      receiver: receiverUserId,
      message,
    });
  };

  React.useEffect(() => {
    socket?.on('messages:sent', ({ newMessage }: { newMessage: IMessages }) => {
      if (newMessage.receiver === id) {
        setMessages((prev) => [...prev, newMessage]);
        setChats((prev) => {
          const receiver = newMessage.receiver;
          filteredChats(prev, newMessage, receiver);
          return [...prev];
        });
      }
    });

    socket?.on('message:received', async ({ newMessage }: { newMessage: IMessages }) => {
      if (newMessage.sender === id) {
        setMessages((prev) => [...prev, newMessage]);
        setChats((prev) => {
          filteredChats(prev, newMessage);
          return [...prev];
        });
      } else {
        const ifPreviouslyMessaged =
          chats.filter((chat) => chat.messagesWith === newMessage.sender).length > 0;

        if (ifPreviouslyMessaged) {
          setChats((prev) => {
            const { previousChat } = filteredChats(prev, newMessage);
            return [
              previousChat,
              ...prev.filter((chat) => chat.messagesWith !== newMessage.sender),
            ];
          });
        } else {
          const user = await dispatch(getChatUser(newMessage.sender));
          console.log('user', newMessage.sender);
          setBannerData({
            name: user!.name.firstName + ' ' + user!.name.lastName,
            avatar: user!.avatar,
            bio: { gender: user!.bio.gender },
          });

          const newChat: IChats = {
            messagesWith: newMessage.sender,
            name: user!.name.firstName + ' ' + user!.name.lastName,
            avatar: user!.avatar,
            lastMessage: newMessage.message,
            date: newMessage.date,
            countUnreadMessages: 0,
            lastVisit: 0,
          };

          setChats((prev) => [
            newChat,
            ...prev.filter((chat) => chat.messagesWith !== newMessage.sender),
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
    messages,
    bannerData,
    sendMessage,
    chats,
    setChats,
    deleteMessage,
    loadingMessages,
    totalMessages,
  };
};
