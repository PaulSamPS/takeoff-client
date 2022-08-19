import React from 'react';
import styles from './General.module.scss';
import { Input } from '../../../components/UI/Input/Input';
import { Button } from '../../../components/UI/Button/Button';

export const General = () => {
  const [isChangePassword, setIsChangePassword] = React.useState<boolean>(false);

  const handleChangePassword = () => {
    setIsChangePassword(true);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.top}>Общее</h2>
      <div className={styles.body}>
        {!isChangePassword && (
          <div className={styles.item}>
            <div>Пароль</div>
            <span className={styles.change} onClick={handleChangePassword}>
              Изменить
            </span>
          </div>
        )}
        {isChangePassword && (
          <div className={styles.changePassword}>
            <div className={styles.password}>
              <span>Текущий пароль</span>
              <Input placeholder='Введите текущий пароль' type='password' />
            </div>
            <div className={styles.password}>
              <span>Новый пароль</span>
              <Input placeholder='Введите новый пароль' type='password' />
            </div>
            <div className={styles.password}>
              <span>Повторите пароль</span>
              <Input placeholder='Повторите новый пароль' type='password' />
            </div>
            <Button appearance='primary'>Сохранить</Button>
            <span className={styles.hide} onClick={() => setIsChangePassword(false)}>
              Скрыть
            </span>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        Вы можете <span>удалить свою страницу</span>
      </div>
    </div>
  );
};
