import React from 'react';
import styles from './Friendslist.module.scss';
import { useRequest } from '../../hooks/useRequest';
import { RightBar } from '../../components/RightBar/RightBar';
import { Outlet } from 'react-router-dom';

export const FriendsList = (): JSX.Element => {
  const { request } = useRequest();

  return (
    <div className={styles.wrapper}>
      <Outlet />
      <RightBar
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
