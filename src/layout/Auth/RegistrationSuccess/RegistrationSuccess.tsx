import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Auth.module.scss';

export const RegistrationSuccess = (): JSX.Element => {
  return (
    <h2 className={styles.success}>
      Успешная регистрация, теперь вы можете
      <Link to={'/'} className={styles.switch}>
        войти
      </Link>
    </h2>
  );
};
