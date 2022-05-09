import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logout } from '../../../redux/actions/authAction';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../../helpers/icons/profile.svg';

export const Header = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navigateToProfile = () => {
    navigate('profile');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.logo}>TakeOff</h2>
        <div className={styles.profile} onClick={navigateToProfile}>
          <ProfileIcon />
          <span>{user.name}</span>
        </div>
        <div className={styles.logout} onClick={handleLogout}>
          Выйти
        </div>
      </div>
    </div>
  );
};
