import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';
import React from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { Toast } from '../../components/UI/Toast/Toast';
import {useLayoutSocket} from '../../helpers/layoutSocket';

export const Layout = (): JSX.Element => {
  const {loginUser, showNewMessageModal, bannerData, newMessageReceived, setShowNewMessageModal} = useLayoutSocket();

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
