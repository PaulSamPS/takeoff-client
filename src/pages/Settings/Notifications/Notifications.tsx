import React, { ChangeEvent } from 'react';
import styles from './Notifications.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setNotificationMessage } from '../../../redux/reducers/auth/loginReducer';
import { setSettings } from '../../../redux/actions/authAction';

export const Notifications = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [checked, setChecked] = React.useState<boolean>(
    loginUser.settings.notification.messagesToast
  );
  const dispatch = useAppDispatch();

  const handleChecked = async (e: ChangeEvent<HTMLInputElement>) => {
    const obj = {
      userId: loginUser.id,
      notification: e.target.checked,
    };
    setChecked(e.target.checked);
    dispatch(setNotificationMessage(e.target.checked));
    await dispatch(setSettings(obj));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.top}>Уведомления на сайте</h2>
      <div className={styles.item}>
        <span>Показывать мгновенные уведомления</span>
        <input
          type='checkbox'
          name='toggle'
          checked={checked}
          onChange={handleChecked}
          className={styles.toggleButton}
        />
      </div>
    </div>
  );
};
