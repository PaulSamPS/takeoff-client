import React from 'react';
import { Input, Button, Modal } from '../../../components/UI';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteAccount } from '../../../redux/actions/usersAction';

import styles from './General.module.scss';

export const General = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [isChangePassword, setIsChangePassword] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleChangePassword = () => {
    setIsChangePassword(true);
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount(loginUser.id));
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
        Вы можете <span onClick={() => setModal(true)}>удалить свою страницу</span>
      </div>
      <Modal setModal={setModal} modal={modal}>
        <div className={styles.modal}>
          <span>Удалить профиль?</span>
          <Button appearance='primary' onClick={handleDeleteAccount}>
            Да
          </Button>
          <Button appearance='secondary' onClick={() => setModal(false)}>
            Нет
          </Button>
        </div>
      </Modal>
    </div>
  );
};
