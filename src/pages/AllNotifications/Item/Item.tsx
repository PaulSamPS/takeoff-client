import React from 'react';
import styles from './Item.module.scss';
import { useNotifications } from '../../../hooks/useNotifications';
import { NotificationListItem } from '../../../components/NotificationList/NotificationListItem/NotificationListItem';
import { useAppSelector } from '../../../hooks/redux';
import { useLocation } from 'react-router-dom';

export const Item = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { notifications } = useNotifications();
  const { pathname } = useLocation();

  return (
    <div className={styles.wrapper}>
      {notifications.notifications.filter((n) => n.user._id !== loginUser.id).length > 0 ? (
        <>
          {pathname === '/main/all-notifications' ? (
            <>
              {notifications.notifications
                .filter((n) => n.user._id !== loginUser.id)
                .filter((n) => n.type === 'newLike')
                .slice(0, 10)
                .map((notification) => (
                  <NotificationListItem key={notification._id} notification={notification} />
                ))}
            </>
          ) : (
            <>
              {notifications.notifications
                .filter((n) => n.user._id !== loginUser.id)
                .filter((n) => n.type === 'newComment')
                .slice(0, 10)
                .map((notification) => (
                  <NotificationListItem key={notification._id} notification={notification} />
                ))}
            </>
          )}
        </>
      ) : (
        <div className={styles.noNotifications}>Нет уведомлений</div>
      )}
    </div>
  );
};
