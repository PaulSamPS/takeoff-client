import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';
import React, { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Sidebar } from './Sidebar/Sidebar';
import { getChatUser } from '../../redux/actions/chatAction';
import { Toast } from '../../components/UI/Toast/Toast';
import { SocketContext } from '../../helpers/context';
import { setSocketUsers } from '../../redux/reducers/socketUsersReducer';
import { IMessages } from '../../interfaces/useChat.interface';
import { INewMessageToast, IOnlineUsers } from '../../interfaces/layout.interface';

const initialStateBannerData = {
  name: '',
  avatar: '',
};

export const Layout = (): JSX.Element => {
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
        setBannerData({ name: user!.firstName + ' ' + user!.lastName, avatar: user!.avatar });
        socket?.emit('message:toUnread', {
          receiver: loginUser.id,
          sender: newMessage.sender,
        });
        setTimeout(() => {
          socket?.emit('chat:get', { userId: loginUser.id });
        }, 500);
        setNewMessageReceived({
          ...newMessage,
          name: user!.firstName + ' ' + user!.lastName,
          avatar: user!.avatar,
        });
        setShowNewMessageModal(true);
        document.title = `Новое сообщение от ${user!.firstName + ' ' + user!.lastName}`;
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
          <Sidebar className={styles.sidebar} />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
      {loginUser.settings.notification.messagesToast && (
        <Toast
          setModal={setShowNewMessageModal}
          modal={showNewMessageModal}
          bannerData={bannerData}
          newMessageReceived={newMessageReceived}
        />
      )}
    </>
  );
};
