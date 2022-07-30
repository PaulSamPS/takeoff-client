import React from 'react';
import styles from './UserFriends.module.scss';
import { Outlet } from 'react-router-dom';

export const UserFriends = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};
