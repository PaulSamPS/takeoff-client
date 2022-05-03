import React from 'react';
import styles from './Boards.module.scss';

export const Boards = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>Bronze 100$</div>
      <div className={styles.table}>Silvev 500$</div>
      <div className={styles.table}>Gold 1000$</div>
      <div className={styles.table}>Platina 5000$</div>
    </div>
  );
};

