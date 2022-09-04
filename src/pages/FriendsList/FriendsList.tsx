import React from 'react';
import styles from './Friendslist.module.scss';
import { RightBar } from '../../components/RightBar/RightBar';
import { Outlet } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const FriendsList = (): JSX.Element => {
  const { request } = useRequest();
  const { screenWidth } = useScreenWidth();
  return (
    <div className={styles.wrapper}>
      <Outlet />
      {screenWidth > 1000 && (
        <RightBar
          totalUnviewed={request.length}
          firstItem={'Мои друзья'}
          secondItem={'Заявки в друзья'}
          thirdItem={'Поиск друзей'}
          firstItemLink={'/main/friends'}
          secondItemLink={'/main/friends/requests'}
          thirdItemLink={'/main/friends/find'}
        />
      )}
    </div>
  );
};
