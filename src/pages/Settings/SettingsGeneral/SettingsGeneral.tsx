import React from 'react';
import styles from './SettingsGeneral.module.scss';

export const SettingsGeneral = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.top}>Общее</h2>
      <div className={styles.body}>
        <div className={styles.item}>
          <div>Пароль</div>
          <div className={styles.change}>Изменить</div>
        </div>
      </div>
    </div>
  );
};
