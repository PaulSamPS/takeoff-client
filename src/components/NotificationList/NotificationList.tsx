import React, { memo } from 'react';
import styles from './NotificationList.module.scss';
import { NotificationListProps } from './NotificationList.props';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useNotifications } from '../../hooks/useNotifications';
import { Notification } from '../Notification/Notification';
import { Spinner } from '../UI/Spinner/Spinner';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';

export const NotificationList = memo(
  ({ setVisibleNotification, ...props }: NotificationListProps): JSX.Element => {
    const loginUser = useAppSelector((state) => state.loginReducer.user);

    const notificationsRef = React.useRef<HTMLDivElement>(null);

    useOnClickOutside(notificationsRef, () => setVisibleNotification(false));

    const { notifications, isLoading } = useNotifications();

    const notificationsLength =
      notifications.notifications.filter((n) => n.user._id !== loginUser.id).length > 0;

    return (
      <div
        className={styles.wrapper}
        ref={notificationsRef}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
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
                      <Notification
                        key={notification._id}
                        setVisibleNotification={setVisibleNotification}
                        notification={notification}
                      />
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
            <Link to={'/main/all-notifications'} onClick={() => setVisibleNotification(false)}>
              Показать все
            </Link>
          </div>
        )}
      </div>
    );
  }
);
