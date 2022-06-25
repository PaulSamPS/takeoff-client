import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';
import React from 'react';
import { socket } from '../../helpers/socket';
import { getChatUser, setMessagesUnread } from '../../redux/actions/chatAction';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Toast } from '../../components/Toast/Toast';
import { Sidebar } from './Sidebar/Sidebar';
import { useRequest } from '../../hooks/useRequest';
import { useChat } from '../../hooks/useChat';

export const Layout = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const dispatch = useAppDispatch();
  const [newMessageReceived, setNewMessageReceived] = React.useState<any>(null);
  const [newMessageModal, showNewMessageModal] = React.useState(false);
  const [bannerData, setBannerData] = React.useState<any>({
    name: '',
    avatar: '',
  });
  const { request } = useRequest();
  const { chats } = useChat();

  React.useEffect(() => {
    socket.on('message:received', async ({ newMessage }) => {
      if (window.location.pathname !== `/main/conversations/${newMessage.sender}`) {
        const user = await dispatch(getChatUser(newMessage.sender));
        setBannerData({ name: user?.name, avatar: user?.avatar });
        dispatch(setMessagesUnread(loginUser.id, user?.id));

        setNewMessageReceived({
          ...newMessage,
          name: user?.name,
          avatar: user?.avatar,
        });
        showNewMessageModal(true);
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
        setModal={showNewMessageModal}
        modal={newMessageModal}
        className={styles.toast}
        bannerData={bannerData}
        newMessageReceived={newMessageReceived}
      />
    </>
  );
};
