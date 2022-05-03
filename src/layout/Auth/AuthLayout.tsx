import React from 'react';
import styles from './AuthLayout.module.scss';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1>Takeoff</h1>
      </div>
      <div className={styles.bottom}>
        <Outlet />
      </div>
    </div>
  );
};
