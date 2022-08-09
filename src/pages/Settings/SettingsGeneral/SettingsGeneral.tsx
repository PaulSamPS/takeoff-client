import React from 'react';
import styles from './SettingsGeneral.module.scss';

export const SettingsGeneral = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.top}>Общее</h2>
      <div className={styles.body}>
        <div className={styles.item}>
          <div>Пароль</div>
          <span className={styles.change}>Изменить</span>
        </div>
      </div>
      <div className={styles.bottom}>
        Вы можете <span>удалить свою страницу</span>
      </div>
    </div>
  );
};
