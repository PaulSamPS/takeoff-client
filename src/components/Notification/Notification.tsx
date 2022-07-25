import React from 'react';
import styles from './Notification.module.scss';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';
import { NotificationProps } from './Notification.props';

export const Notification = ({ setVisibleNotification }: NotificationProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setVisibleNotification(false));

  return (
    <div className={styles.wrapper} ref={ref}>
      Notification
    </div>
  );
};
