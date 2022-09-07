import React from 'react';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';
import styles from './AllNotifications.module.scss';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const AllNotifications = () => {
  const { screenWidth } = useScreenWidth();

  return (
    <div className={styles.wrapper}>
      <Outlet />
      {screenWidth > 1000 && (
        <RightBar
          firstItem={'Лайки'}
          secondItem={'Комментарии'}
          firstItemLink={'/main/all-notifications'}
          secondItemLink={'/main/all-notifications/comments'}
        />
      )}
    </div>
  );
};
