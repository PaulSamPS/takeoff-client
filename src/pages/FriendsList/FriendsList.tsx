import React from 'react';
import styles from './Friendslist.module.scss';
import { RightBar } from '../../components/RightBar/RightBar';
import { Outlet } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest';

export const FriendsList = (): JSX.Element => {
  const { request } = useRequest();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <RightBar
        className={styles.rightBar}
        totalUnviewed={request.length}
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
