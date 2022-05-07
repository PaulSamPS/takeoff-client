import React from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { logout } from '../../../redux/actions/authAction';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../../helpers/icons/profile.svg';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <ProfileIcon />
      </div>
      <div className={styles.logout} onClick={handleLogout}>
        Выйти
      </div>
    </div>
  );
};
