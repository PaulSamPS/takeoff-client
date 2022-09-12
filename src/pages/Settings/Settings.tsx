import React from 'react';
import styles from './Settings.module.scss';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';

export const Settings = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <RightBar
        className={styles.rightBar}
        firstItem={'Общее'}
        secondItem={'Уведомления'}
        firstItemLink={'/main/settings'}
        secondItemLink={'/main/settings/notifications'}
      />
    </div>
  );
};
