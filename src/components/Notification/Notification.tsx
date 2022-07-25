import React from 'react';
import styles from './Notification.module.scss';
import { ReactComponent as ArrowDownIcon } from '../../helpers/icons/arrowDown.svg';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';
import { NotificationProps } from './Notification.props';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { useAppSelector } from '../../hooks/redux';
import { Button } from '../UI/Button/Button';
import { calculateTime } from '../../helpers/calculateTime';

export const Notification = ({ setVisibleNotification }: NotificationProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setVisibleNotification(false));
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const usersOnline = users.map((user: any) => user.userId);

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
            <div className={styles.user}>
              <Link to={'#'}>{loginUser.firstName + ' ' + loginUser.lastName}</Link>
              <div className={styles.hoverUser}>
                <img
                  src={
                    loginUser.avatar == null
                      ? `/photo.png`
                      : `${API_URL}/avatar/${loginUser.avatar}`
                  }
                  alt={loginUser.firstName + '' + loginUser.lastName}
                />
                <div className={styles.infoHoverUser}>
                  <Link to={'#'}>{loginUser.firstName + ' ' + loginUser.lastName}</Link>
                  {usersOnline.includes(loginUser.id) ? (
                    <div className={styles.online}>online</div>
                  ) : (
                    <div className={styles.lastVisit}>
                      {loginUser.bio.gender === 'Мужской' ? 'заходил ' : 'заходила '}
                      {calculateTime(loginUser.lastVisit)}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
          <Button appearance='transparent'>
            <ArrowDownIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
