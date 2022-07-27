import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { ReactComponent as ArrowDownIcon } from '../../../helpers/icons/arrowDown.svg';
import { ReactComponent as NotificationIcon } from '../../../helpers/icons/notification.svg';
import { ReactComponent as SearchIcon } from '../../../helpers/icons/search.svg';
import { ProfileMenu } from '../../../components/ProfileMenu/ProfileMenu';
import { Count } from '../../../components/Count/Count';
import { Notification } from '../../../components/Notification/Notification';
import { Input } from '../../../components/UI/Input/Input';
import cn from 'classnames';
import { useNotifications } from '../../../hooks/useNotifications';

export const Header = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [visibleMenu, setVisibleMenu] = React.useState<boolean>(false);
  const [visibleNotification, setVisibleNotification] = React.useState<boolean>(false);
  const { notifications } = useNotifications();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to={'/main/news'} className={styles.logo}>
          <h2>TakeOff</h2>
        </Link>
        <div className={styles.search}>
          <Input placeholder='Поиск' />
          <SearchIcon />
        </div>
        <div className={styles.notification} onClick={() => setVisibleNotification(true)}>
          <div className={cn(styles.icon, { [styles.notificationVisible]: visibleNotification })}>
            <NotificationIcon />
          </div>
          {notifications.notifications.length > 0 && (
            <Count className={styles.count}>{notifications.notifications.length}</Count>
          )}
          {visibleNotification && <Notification setVisibleNotification={setVisibleNotification} />}
        </div>
        <div
          className={cn(styles.profile, { [styles.profileMenuVisible]: visibleMenu })}
          onClick={() => setVisibleMenu(true)}
        >
          <img
            src={loginUser.avatar == null ? `/photo.png` : `${API_URL}/avatar/${loginUser.avatar}`}
            alt={loginUser.firstName + ' ' + loginUser.lastName}
          />
          <ArrowDownIcon />
          {visibleMenu && (
            <ProfileMenu onClick={(e) => e.stopPropagation()} setVisibleMenu={setVisibleMenu} />
          )}
        </div>
      </div>
    </div>
  );
};
