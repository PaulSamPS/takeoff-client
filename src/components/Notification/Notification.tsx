import React from 'react';
import styles from './Notification.module.scss';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';
import { NotificationProps } from './Notification.props';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { useAppSelector } from '../../hooks/redux';

export const Notification = ({ setVisibleNotification }: NotificationProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setVisibleNotification(false));

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.top}>
        <span>Ваша страница</span>
        <Link to={'#'}>Настройки</Link>
      </div>
      <div className={styles.notification}>
        <img
          src={loginUser.avatar == null ? `/photo.png` : `${API_URL}/avatar/${loginUser.avatar}`}
          alt={loginUser.firstName + '' + loginUser.lastName}
        />
        <div className={styles.info}>
          <span className={styles.infoText}>
            <Link to={'#'} className={styles.user}>
              {loginUser.firstName + ' ' + loginUser.lastName}
            </Link>
            <span>оценил вашу запись от</span>
            <Link to={'#'}>26 июля в 20:20</Link>
          </span>
          <span>сегодня в 20:00</span>
        </div>
        <div className={styles.postImage}>
          <img
            src={loginUser.avatar == null ? `/photo.png` : `${API_URL}/avatar/${loginUser.avatar}`}
            alt={loginUser.firstName + '' + loginUser.lastName}
          />
        </div>
      </div>
    </div>
  );
};
