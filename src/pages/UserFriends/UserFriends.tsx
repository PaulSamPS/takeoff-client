import React from 'react';
import styles from './UserFriends.module.scss';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const UserFriends = () => {
  const { screenWidth } = useScreenWidth();

  return (
    <div className={styles.wrapper}>
      <Outlet />
      {screenWidth > 1000 && (
        <RightBar
          firstItem={'Друзья'}
          secondItem={'Подписчики'}
          firstItemLink={'/main/user-friends'}
          secondItemLink={'/main/user-friends/followers'}
        />
      )}
    </div>
  );
};
