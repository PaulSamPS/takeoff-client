import React from 'react';
import styles from './NotificationList.module.scss';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';
import { NotificationListProps } from './NotificationList.props';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useNotifications } from '../../hooks/useNotifications';
import { Notification } from '../Notification/Notification';
import { Spinner } from '../UI/Spinner/Spinner';

export const NotificationList = ({ setVisibleNotification, ...props }: NotificationListProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const ref = React.useRef<HTMLDivElement>(null);
  const { notifications, isLoading } = useNotifications();
  useOnClickOutside(ref, () => setVisibleNotification(false));
  const notificationsLength =
    notifications.notifications.filter((n) => n.user._id !== loginUser.id).length > 0;

  return (
    <div className={styles.wrapper} ref={ref} {...props}>
      <div className={styles.top}>
        <span>Ваша страница</span>
        <Link to={'/main/settings'} onClick={() => setVisibleNotification(false)}>
          Настройки
        </Link>
      </div>
      <div className={styles.middle} style={{ display: notificationsLength ? 'block' : 'flex' }}>
        {!isLoading ? (
          <>
            {notifications.notifications.filter((n) => n.user._id !== loginUser.id).length > 0 ? (
              <>
                {notifications.notifications
                  .slice(0, 10)
                  .filter((n) => n.user._id !== loginUser.id)
                  .map((notification) => (
                    <Notification key={notification._id} notification={notification} />
                  ))}
              </>
            ) : (
              <div className={styles.noNotifications}>Нет уведомлений</div>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </div>
      {notifications.notifications.filter((n) => n._id !== loginUser.id).length > 0 && (
        <div className={styles.bottom}>
          <Link to={'#'}>Показать все</Link>
        </div>
      )}
    </div>
  );
};
