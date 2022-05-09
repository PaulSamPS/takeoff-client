import React from 'react';
import { UserProps } from './User.props';
import { ReactComponent as SettingsIcon } from '../../helpers/icons/settings.svg';
import styles from './User.module.scss';
import { API_URL } from '../../http/axios';
import cn from 'classnames';

export const User = ({ user }: UserProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img
          src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
          alt={user.name}
        />
      </div>
      <div className={styles.info}>
        <label>
          Логин:
          <span>{user.name}</span>
        </label>
        <label>
          Email:
          <span>{user.email}</span>
        </label>
      </div>
      <div className={styles.position}>
        <label>
          Позиция:
          <span>{user.position}</span>
        </label>
        <label>
          Уровень:
          <span>{user.level}</span>
        </label>
      </div>
      <div className={styles.settingsBlock}>
        <SettingsIcon />
        <div className={cn(styles.dropdownContent, styles.settings)}>
          <span>Изменить</span>
          <span>Удалить</span>
        </div>
      </div>
    </div>
  );
};
