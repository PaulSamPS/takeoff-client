import React from 'react';
import styles from '../Info/Info.module.scss';
import { InfoProps } from './Info.props';

export const Info = ({ user }: InfoProps) => {
  return (
    <div className={styles.info}>
      <label>
        Логин:
        <span>{user?.name}</span>
      </label>
      <label>
        Email:
        <span>{user?.email}</span>
      </label>
      <label>
        Позиция:
        <span>{user?.position}</span>
      </label>
      <label>
        Уровень:
        <span>{user?.level}</span>
      </label>
    </div>
  );
};
