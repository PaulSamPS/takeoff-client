import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';
import React, { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Sidebar } from './Sidebar/Sidebar';
import { getChatUser } from '../../redux/actions/chatAction';
import { Toast } from '../../components/UI/Toast/Toast';
import { useChat } from '../../hooks/useChat';
import { useRequest } from '../../hooks/useRequest';
import { SocketContext } from '../../helpers/context';
import { setSocketUsers } from '../../redux/reducers/socketUsersReducer';

interface IOnlineUsers {
  userId: string | undefined;
  socketId: string;
}

interface IUsers {
  usersOnline: IOnlineUsers[];
}

export const Layout = () => {
  const socket = useContext(SocketContext);
  const { chats } = useChat();
  const { request } = useRequest();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const dispatch = useAppDispatch();
  const [newMessageReceived, setNewMessageReceived] = React.useState<any>(null);
  const [showNewMessageModal, setShowNewMessageModal] = React.useState<boolean>(false);
  const [bannerData, setBannerData] = React.useState<any>({
    name: '',
    avatar: '',
  });

  const { user } = useAppSelector((state) => state.loginReducer);

  React.useEffect(() => {
    setInterval(() => {
      socket?.emit('user:add', { userId: user.id });
    }, 3000);
    socket?.on('user_list:update', ({ usersOnline }: IUsers) => {
      dispatch(setSocketUsers(usersOnline));
      console.log('u', usersOnline);
    });

    return () => {
      socket?.off('user_list:update');
      socket?.disconnect();
    };
  }, [socket]);

  React.useEffect(() => {
    socket?.on('message:received', async ({ newMessage }) => {
      if (window.location.pathname !== `/main/conversations/${newMessage.sender}`) {
        const user = await dispatch(getChatUser(newMessage.sender));
        setBannerData({ name: user?.name, avatar: user?.avatar });
        socket?.emit('message:toUnread', {
          receiver: loginUser.id,
          sender: newMessage.sender,
        });
        setTimeout(() => {
          socket?.emit('chat:get', { userId: loginUser.id });
        }, 500);
        setNewMessageReceived({
          ...newMessage,
          name: user?.name,
          avatar: user?.avatar,
        });
        setShowNewMessageModal(true);
        document.title = `Новое сообщение от ${user?.name}`;
      }
    });
    return () => {
      socket?.off('message:received');
    };
  }, [socket]);

  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.main}>
          <Sidebar className={styles.sidebar} chats={chats} requests={request} />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
      <Toast
        setModal={setShowNewMessageModal}
        modal={showNewMessageModal}
        bannerData={bannerData}
        newMessageReceived={newMessageReceived}
      />
    </>
  );
};
