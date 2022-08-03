import React from 'react';
import styles from './NotificationList.module.scss';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';
import { NotificationListProps } from './NotificationList.props';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useNotifications } from '../../hooks/useNotifications';
import { Notification } from '../Notification/Notification';

export const NotificationList = ({ setVisibleNotification }: NotificationListProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setVisibleNotification(false));
  const { notifications } = useNotifications();

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.top}>
        <span>Ваша страница</span>
        <Link to={'#'}>Настройки</Link>
      </div>
      <div className={styles.middle}>
        {notifications.notifications.filter((n) => n.user._id !== loginUser.id).length > 0 ? (
          <>
            {notifications.notifications
              .filter((n) => n.user._id !== loginUser.id)
              .map((notification) => (
                <Notification key={notification._id} notification={notification} />
              ))}
          </>
        ) : (
          <div className={styles.noNotifications}>Нет уведомлений</div>
        )}
      </div>
      <div className={styles.bottom}>
        <Link to={'#'}>Показать все</Link>
      </div>
    </div>
  );
};
