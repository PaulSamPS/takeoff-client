import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logout } from '../../../redux/actions/authAction';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../../helpers/icons/profile.svg';
import { ReactComponent as ChatIcon } from '../../../helpers/icons/chat.svg';

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

  const navigateTeoMain = () => {
    navigate('main');
  };

  const navigateToConversations = () => {
    navigate('conversations');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <h2 onClick={navigateTeoMain}>TakeOff</h2>
        </div>
        <div className={styles.messages} onClick={navigateToConversations}>
          <ChatIcon />
          <div className={styles.unreadMessages}>9</div>
        </div>
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
