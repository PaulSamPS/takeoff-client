import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Toast } from '../../components/UI';
import { useLayoutSocket } from '../../helpers/layoutSocket';

import styles from './Layout.module.scss';

export const Layout = (): JSX.Element => {
  const { loginUser, showNewMessageModal, bannerData, newMessageReceived, setShowNewMessageModal } =
    useLayoutSocket();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Header className={styles.header} />
        </div>
        <Sidebar className={styles.sidebar} />
        <div className={styles.main}>
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
