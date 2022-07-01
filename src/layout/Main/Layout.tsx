import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Sidebar } from './Sidebar/Sidebar';
import { getChatUser } from '../../redux/actions/chatAction';
import { Toast } from '../../components/Toast/Toast';
import { context, SocketContext } from '../../helpers/context';
import { useChat } from '../../hooks/useChat';
import { useRequest } from '../../hooks/useRequest';
export const Layout = () => {
  const { socket } = context();
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
  const location = useLocation();
  console.log(location.pathname);

  React.useEffect(() => {
    socket?.on('message:received', async ({ newMessage }) => {
      if (location.pathname !== `/main/conversations/${newMessage.sender}`) {
        const user = await dispatch(getChatUser(newMessage.sender));
        setBannerData({ name: user?.name, avatar: user?.avatar });
        socket?.emit('message:toUnread', {
          userId: loginUser.id,
          msgSendToUserId: newMessage.sender,
        });
        setTimeout(() => {
          socket?.emit('chat:get', { userId: loginUser.id });
        }, 1000);
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
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </>
  );
};
