import React from 'react';
import styles from './Friendslist.module.scss';
import { RightBar } from '../../components/RightBar/RightBar';
import { Outlet } from 'react-router-dom';

export const FriendsList = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <RightBar
        firstItem={'Мои друзья'}
        secondItem={'Заявки в друзья'}
        thirdItem={'Поиск друзей'}
        firstItemLink={'/main/friends'}
        secondItemLink={'/main/friends/requests'}
        thirdItemLink={'/main/friends/find'}
      />
    </div>
  );
};
