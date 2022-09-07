import React, { useContext } from 'react';
import { SocketContext } from './socketContext';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { INewMessageToast, IOnlineUsers } from '../interfaces/layout.interface';
import { setSocketUsers } from '../redux/reducers/socketUsersReducer';
import { IMessages } from '../interfaces/useChat.interface';
import { getChatUser } from '../redux/actions/chatAction';

const initialStateBannerData = {
  name: '',
  avatar: '',
};

export const useLayoutSocket = () => {
  const socket = useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const dispatch = useAppDispatch();
  const [newMessageReceived, setNewMessageReceived] = React.useState<INewMessageToast | null>(null);
  const [showNewMessageModal, setShowNewMessageModal] = React.useState<boolean>(false);

  const [bannerData, setBannerData] = React.useState<any>(initialStateBannerData);

  React.useEffect(() => {
    setInterval(() => {
      socket?.emit('user:add', { userId: loginUser.id });
      socket?.emit('notifications:countGet', { userId: loginUser.id });
    }, 3000);
    socket?.on('user_list:update', ({ usersOnline }: { usersOnline: IOnlineUsers[] }) => {
      dispatch(setSocketUsers(usersOnline));
    });

    return () => {
      socket?.off('user_list:update');
      socket?.disconnect();
    };
  }, [socket]);

  React.useEffect(() => {
    socket?.on('message:received', async ({ newMessage }: { newMessage: IMessages }) => {
      if (window.location.pathname !== `/main/conversations/${newMessage.sender}`) {
        const user = await dispatch(getChatUser(newMessage.sender));
        setBannerData({
          name: user!.name.firstName + ' ' + user!.name.lastName,
          avatar: user!.avatar,
        });
        socket?.emit('message:toUnread', {
          receiver: loginUser.id,
          sender: newMessage.sender,
        });
        setTimeout(() => {
          socket?.emit('chat:get', { userId: loginUser.id });
        }, 500);
        setNewMessageReceived({
          ...newMessage,
          name: user!.name.firstName + ' ' + user!.name.lastName,
          avatar: user!.avatar,
        });
        setShowNewMessageModal(true);
        document.title = `Новое сообщение от ${user!.name.firstName + ' ' + user!.name.lastName}`;
      }
    });
    return () => {
      socket?.off('message:received');
    };
  }, [socket]);

  return { bannerData, newMessageReceived, showNewMessageModal, setShowNewMessageModal, loginUser };
};
