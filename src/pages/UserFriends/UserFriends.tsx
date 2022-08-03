import React from 'react';
import styles from './UserFriends.module.scss';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';

export const UserFriends = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <RightBar
        firstItem={'Друзья'}
        secondItem={'Подписчики'}
        firstItemLink={'/main/user-friends'}
        secondItemLink={'/main/user-friends/followers'}
      />
    </div>
  );
};
