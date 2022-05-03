import React from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu} >Menu</div>
      <div className={styles.logout}>logout</div>
    </div>
  );
};

