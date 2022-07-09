import React from 'react';
import styles from './AuthLayout.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthLayout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('AccessToken')) {
      navigate({ pathname: '/posts', search: '?posts=all' });
    }
  }, []);

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
