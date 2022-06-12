import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logout } from '../../../redux/actions/authAction';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../helpers/socket';
import { API_URL } from '../../../http/axios';
import { useChat } from '../../../hooks/useChat';

export const Header = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users } = useChat();
  const online = users.map((user: any) => user.userId);

  const handleLogout = () => {
    socket.emit('logout', { userId: user.id });
    dispatch(logout());
    navigate('/');
  };

  const navigateToProfile = () => {
    navigate(`profile`);
  };

  const navigateTeoMain = () => {
    navigate('main');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <h2 onClick={navigateTeoMain}>TakeOff</h2>
        </div>
        <div className={styles.profile} onClick={navigateToProfile}>
          <div className={styles.avatar}>
            <img
              src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
              alt={user.name}
            />
            {online.includes(user.id) && <div className={styles.online} />}
          </div>
          <span>{user.name}</span>
        </div>
        <div className={styles.logout} onClick={handleLogout}>
          Выйти
        </div>
      </div>
    </div>
  );
};
