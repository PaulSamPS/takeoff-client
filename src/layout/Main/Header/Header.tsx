import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../../helpers/icons/arrowDown.svg';
import { ReactComponent as NotificationIcon } from '../../../helpers/icons/notification.svg';
import { useAppSelector } from '../../../hooks/redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { ProfileMenu } from '../../../components/ProfileMenu/ProfileMenu';
import { Count } from '../../../components/UI';
import { NotificationList } from '../../../components/NotificationList/NotificationList';
import { useNotifications } from '../../../hooks/useNotifications';
import { Search } from './Search/Search';

import cn from 'classnames';

import styles from './Header.module.scss';

export const Header: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className }) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [visibleMenu, setVisibleMenu] = React.useState<boolean>(false);
  const [visibleNotification, setVisibleNotification] = React.useState<boolean>(false);

  const { notificationsCount, handleReadNotifications } = useNotifications();

  const handleOpenNotifications = () => {
    setVisibleNotification(true);
    handleReadNotifications();
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <Link to={'/main/news'} className={styles.logo}>
        <h2>TakeOff</h2>
      </Link>
      <Search />
      <div className={styles.notification} onClick={handleOpenNotifications}>
        <div className={cn(styles.icon, { [styles.notificationVisible]: visibleNotification })}>
          <NotificationIcon />
        </div>
        {notificationsCount > 0 && <Count className={styles.count}>{notificationsCount}</Count>}
        {visibleNotification && (
          <NotificationList setVisibleNotification={setVisibleNotification} />
        )}
      </div>
      <div
        className={cn(styles.profile, { [styles.profileMenuVisible]: visibleMenu })}
        onClick={() => setVisibleMenu(true)}
      >
        <img
          src={loginUser.avatar == null ? `/photo.png` : `${API_URL}/avatar/${loginUser.avatar}`}
          alt={loginUser.name.firstName + ' ' + loginUser.name.lastName}
        />
        <ArrowDownIcon />
        {visibleMenu && (
          <ProfileMenu onClick={(e) => e.stopPropagation()} setVisibleMenu={setVisibleMenu} />
        )}
      </div>
    </div>
  );
};
