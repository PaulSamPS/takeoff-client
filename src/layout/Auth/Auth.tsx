import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import styles from './Auth.module.scss';

export const Auth = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('AccessToken')) {
      navigate('/main/news');
    } else {
      navigate('/');
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
