import React from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from './redux';
import { getChatUser } from '../redux/actions/chatAction';

const URL = 'http://localhost:4000';

interface IBanner {
  name: string | undefined;
  avatar: string | undefined;
}

export const useChat = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const { conversation } = useAppSelector((state) => state.conversationReducer);
  const _id = localStorage.getItem('id');
  const dispatch = useAppDispatch();
  const [users, setUsers] = React.useState([]);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [bannerData, setBannerData] = React.useState<IBanner>({ name: '', avatar: '' });
  const socket = React.useRef<any>();
  const openChatId = React.useRef<string | null>('');

  const [chats, setChats] = React.useState<any>(conversation);

  React.useEffect(() => {
    if (!socket.current) {
      socket.current = io(URL);
    }
    socket.current.emit('user:add', { userId: user.id });
    socket.current.on('user_list:update', ({ users }: any) => {
      users.length > 0 && setUsers(users);
    });

    return () => {
      if (socket) {
        socket.current.emit('disconect');
        socket.current.off();
      }
    };
  }, []);

  React.useEffect(() => {
    socket.current.emit('messages:get', {
      userId: user.id,
      messagesWith: _id,
    });

    socket.current.on('message_list:update', async ({ chat }: any) => {
      setMessages(chat.messages.slice(-20));
      setBannerData({
        name: chat.messagesWith.name,
        avatar: chat.messagesWith.avatar,
      });
      openChatId.current = chat.messagesWith._id;
    });

    socket.current.on('chat:notFound', async () => {
      const user = await dispatch(getChatUser(_id));
      setBannerData({ name: user?.name, avatar: user?.avatar });
      setMessages([]);
      openChatId.current = _id;
    });
  }, []);

  const sendMessage = (message: any) => {
    socket.current.emit('message:add', {
      userId: user.id,
      msgSendToUserId: _id,
      message,
    });
  };

  React.useEffect(() => {
    if (socket.current) {
      socket.current.on('messages:sent', ({ newMessage }: any) => {
        if (newMessage.receiver === _id) {
          setMessages((prev: any) => [...prev, newMessage]);
          setChats((prev: any) => {
            const previousChat = prev.find(
              (chat: any) => chat.messagesWith === newMessage.receiver
            );
            console.log(previousChat);
            // previousChat.lastMessage = newMessage.message;
            // previousChat.date = newMessage.date;

            return [...prev];
          });
        }
      });

      socket.current.on('message:received', async ({ newMessage }: any) => {
        if (newMessage.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);

          setChats((prev: any) => {
            const previousChat = prev.find(
              (chat: { messagesWith: any }) => chat.messagesWith === newMessage.sender
            );
            // previousChat.lastMessage = newMessage.message;
            // previousChat.date = newMessage.date;
            console.log('2', previousChat);

            return [...prev];
          });
        } else {
          const ifPreviouslyMessaged =
            chats.filter((chat: any) => chat.messagesWith === newMessage.sender).length > 0;

          if (ifPreviouslyMessaged) {
            setChats((prev: any) => {
              const previousChat = prev.find(
                (chat: any) => chat.messagesWith === newMessage.sender
              );
              previousChat.lastMessage = newMessage.message;
              previousChat.date = newMessage.date;

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
            setChats((prev: any) => [...prev, newChat]);
          }
        }
      });
    }
  }, []);

  return { users, user, messages, bannerData, sendMessage, chats };
};
