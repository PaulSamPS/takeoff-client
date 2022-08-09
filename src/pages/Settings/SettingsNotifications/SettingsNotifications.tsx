import React from 'react';
import styles from './SettingsNotifications.module.scss';

export const SettingsNotifications = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.top}>Уведомления на сайте</h2>
      <div className={styles.item}>
        <span>Показывать мгновенные уведомления</span>
        <input type='checkbox' name='toggle' id='toggle-button' className={styles.toggleButton} />
      </div>
    </div>
  );
};
