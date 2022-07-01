import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Friendslist.module.scss';
import { useRequest } from '../../hooks/useRequest';
import { RightBar } from '../../components/RightBar/RightBar';

export const FriendsList = () => {
  const { request } = useRequest();
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <RightBar arr={request} firstItem={'Мои друзья'} secondItem={'Заявки в друзья'} />
    </div>
  );
};
