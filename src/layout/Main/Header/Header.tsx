import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logout } from '../../../redux/actions/authAction';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { SocketContext } from '../../../helpers/context';
import { ReactComponent as ArrowDownIcon } from '../../../helpers/icons/arrowDown.svg';

export const Header = () => {
  const socket = React.useContext(SocketContext);
  const { user } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    socket?.emit('logout');
    dispatch(logout());
    socket?.disconnect();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to={'/main/news'} className={styles.logo}>
          <h2>TakeOff</h2>
        </Link>
        <div className={styles.profile}>
          <Link to={`profile/${user.id}`} className={styles.avatar}>
            <img
              src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
              alt={user.firstName + ' ' + user.lastName}
            />
          </Link>
          <ArrowDownIcon />
        </div>
        <div className={styles.logout} onClick={handleLogout}>
          Выйти
        </div>
      </div>
    </div>
  );
};
