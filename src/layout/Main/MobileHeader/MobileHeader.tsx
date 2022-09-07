import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './MobileHeader.module.scss';
import { ReactComponent as BurgerIcon } from '../../../helpers/icons/burger.svg';
import cn from 'classnames';
import { MobileSidebar } from '../../../components/MobileSidebar/MobileSidebar';
import { ReactComponent as NotificationIcon } from '../../../helpers/icons/notification.svg';
import { useNotifications } from '../../../hooks/useNotifications';
import { Count } from '../../../components/UI';
import { NotificationList } from '../../../components/NotificationList/NotificationList';

export const MobileHeader: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className }) => {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(false);
  const [visibleNotification, setVisibleNotification] = React.useState<boolean>(false);

  const { notificationsCount, handleReadNotifications } = useNotifications();

  const handleOpenNotifications = () => {
    setVisibleNotification(true);
    handleReadNotifications();
  };

  console.log(navigator.userAgent);

  return (
    <div className={cn(styles.wrapper, className)}>
      <BurgerIcon onClick={() => setShowSidebar(true)} />
      <div className={styles.notifications}>
        <NotificationIcon onClick={handleOpenNotifications} />
        {notificationsCount > 0 && <Count className={styles.count}>{notificationsCount}</Count>}
        {visibleNotification && (
          <NotificationList setVisibleNotification={setVisibleNotification} />
        )}
      </div>
      <MobileSidebar setModal={setShowSidebar} modal={showSidebar} />
    </div>
  );
};
