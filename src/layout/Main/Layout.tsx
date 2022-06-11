import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import styles from './Layout.module.scss';
import React from 'react';
import { socket } from '../../helpers/socket';
import { getChatUser } from '../../redux/actions/chatAction';
import { useAppDispatch } from '../../hooks/redux';
import { Toast } from '../../components/Toast/Toast';
import { Sidebar } from './Sidebar/Sidebar';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const [newMessageReceived, setNewMessageReceived] = React.useState<any>(null);
  const [newMessageModal, showNewMessageModal] = React.useState(false);
  const [bannerData, setBannerData] = React.useState<any>({
    name: '',
    avatar: '',
  });

  React.useEffect(() => {
    socket.on('message:received', async ({ newMessage }) => {
      if (window.location.pathname !== `/main/conversations/${newMessage.sender}`) {
        const user = await dispatch(getChatUser(newMessage.sender));
        setBannerData({ name: user?.name, avatar: user?.avatar });

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
          <Sidebar />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
        <Footer className={styles.footer} />
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
