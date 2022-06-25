import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';
import React from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { useRequest } from '../../hooks/useRequest';
import { useChat } from '../../hooks/useChat';

export const Layout = () => {
  const { request } = useRequest();
  const { chats } = useChat();
  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.main}>
          <Sidebar requests={request} chats={chats} />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
