import React from 'react';
import styles from './AuthLayout.module.scss';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../pages/Auth/Login/Login';
import { Registration } from '../../pages/Auth/Registration/Registration';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const auth = queryParams.get('auth');

  React.useEffect(() => {
    if (localStorage.getItem('AccessToken')) {
      navigate({ pathname: '/', search: '?posts=all' });
    } else {
      navigate({ pathname: '/auth', search: '?auth=login' });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1>Takeoff</h1>
      </div>
      <div className={styles.bottom}>
        {auth === 'login' && <Login />}
        {auth === 'registration' && <Registration />}
      </div>
    </div>
  );
};
