import React from 'react';
import styles from '../Edit/Edit.module.scss';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';

export const Settings = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <RightBar
        firstItem={'Общее'}
        secondItem={'Уведомления'}
        firstItemLink={'/main/settings'}
        secondItemLink={'/main/settings/notifications'}
      />
    </div>
  );
};
