import React from 'react';
import styles from '../Edit/Edit.module.scss';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const Settings = () => {
  const { screenWidth } = useScreenWidth();
  return (
    <div className={styles.wrapper}>
      <Outlet />
      {screenWidth > 1000 && (
        <RightBar
          firstItem={'Общее'}
          secondItem={'Уведомления'}
          firstItemLink={'/main/settings'}
          secondItemLink={'/main/settings/notifications'}
        />
      )}
    </div>
  );
};
