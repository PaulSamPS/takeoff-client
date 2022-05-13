import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Auth.module.scss';

export const RegistrationSuccess = (): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <h2 className={styles.success}>
      Успешная регистрация, теперь вы можете
      <span className={styles.switch} onClick={handleNavigate}>
        войти
      </span>
    </h2>
  );
};
