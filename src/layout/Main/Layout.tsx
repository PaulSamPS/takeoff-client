import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';
import React from 'react';
import { socket } from '../../helpers/socket';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Sidebar } from './Sidebar/Sidebar';
import { useRequest } from '../../hooks/useRequest';
import { useChat } from '../../hooks/useChat';
import { getChatUser } from '../../redux/actions/chatAction';
import { Toast } from '../../components/Toast/Toast';

export const Layout = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const dispatch = useAppDispatch();
  const [newMessageReceived, setNewMessageReceived] = React.useState<any>(null);
  const [showNewMessageModal, setShowNewMessageModal] = React.useState<boolean>(false);
  const [bannerData, setBannerData] = React.useState<any>({
    name: '',
    avatar: '',
  });
  const { request } = useRequest();
  const { chats } = useChat();

  React.useEffect(() => {
    socket.on('message:received', async ({ newMessage }) => {
      if (window.location.pathname !== `/main/conversations/${newMessage.sender}`) {
        socket.emit('chat:get', { userId: loginUser.id });
        const user = await dispatch(getChatUser(newMessage.sender));
        setBannerData({ name: user?.name, avatar: user?.avatar });
        socket.emit('message:toUnread', {
          userId: loginUser.id,
          msgSendToUserId: newMessage.sender,
        });

        setNewMessageReceived({
          ...newMessage,
          name: user?.name,
          avatar: user?.avatar,
        });
        setShowNewMessageModal(true);
        document.title = `Новое сообщение от ${user?.name}`;
      }
    });
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.main}>
          <Sidebar className={styles.sidebar} requests={request} chats={chats} />
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
