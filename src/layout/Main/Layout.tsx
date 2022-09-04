import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Toast } from '../../components/UI';
import { useLayoutSocket } from '../../helpers/layoutSocket';
import { MobileMenu } from './MobileMenu/MobileMenu';

import styles from './Layout.module.scss';
import { MobileHeader } from './MobileHeader/MobileHeader';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const Layout = (): JSX.Element => {
  const { loginUser, showNewMessageModal, bannerData, newMessageReceived, setShowNewMessageModal } =
    useLayoutSocket();
  const { screenWidth } = useScreenWidth();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          {screenWidth > 1000 ? (
            <Header className={styles.header} />
          ) : (
            <MobileHeader className={styles.header} />
          )}
        </div>
        <div className={styles.content}>
          <Sidebar className={styles.sidebar} />
          <div className={styles.main}>
            <Outlet />
          </div>
        </div>
        <div className={styles.bot}>
          <MobileMenu />
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
