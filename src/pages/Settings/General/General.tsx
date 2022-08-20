import React from 'react';
import { Input, Button, Modal } from '../../../components/UI';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IChangePassword } from '../../../interfaces/IChangePassword.interface';
import { changeUserPassword, deleteAccount } from '../../../redux/actions/authAction';
import { setStateDefault } from '../../../redux/reducers/auth/changePasswordReducer';
import { useForm } from 'react-hook-form';

import styles from './General.module.scss';

export const General = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { error } = useAppSelector((state) => state.changePassword);

  const dispatch = useAppDispatch();

  const [isChangePassword, setIsChangePassword] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IChangePassword>({ mode: 'onChange', reValidateMode: 'onBlur' });

  const handleChangePassword = () => {
    setIsChangePassword(true);
  };

  const closeChangePassword = () => {
    dispatch(setStateDefault());
    setIsChangePassword(false);
  };

  const handleDeleteAccount = async () => {
    await deleteAccount(loginUser.id);
  };

  const onSubmit = (formData: IChangePassword) => {
    formData.userId = loginUser.id;
    dispatch(changeUserPassword(formData)).then(() => {
      reset();
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.top}>Общее</h2>
      <div className={styles.body}>
        {error && <span className={styles.err}>{error}</span>}
        {!isChangePassword && (
          <div className={styles.item}>
            <div>Пароль</div>
            <span className={styles.change} onClick={handleChangePassword}>
              Изменить
            </span>
          </div>
        )}
        {isChangePassword && (
          <form className={styles.changePassword} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.password}>
              <span>Текущий пароль</span>
              <Input
                {...register('currentPassword', {
                  required: { value: true, message: 'Введите текущий пароль' },
                })}
                placeholder='Введите текущий пароль'
                type='password'
                error={errors.currentPassword}
              />
            </div>
            <div className={styles.password}>
              <span>Новый пароль</span>
              <Input
                {...register('newPassword', {
                  required: { value: true, message: 'Введите новый пароль' },
                  minLength: { value: 5, message: 'Не короче 5 символов' },
                  maxLength: { value: 20, message: 'Пароль не должен превышать 20 символов' },
                })}
                placeholder='Введите новый пароль'
                type='password'
                error={errors.newPassword}
              />
            </div>
            <div className={styles.password}>
              <span>Повторите пароль</span>
              <Input
                {...register('repeatNewPassword', {
                  required: { value: true, message: 'Повторите новый пароль' },
                  minLength: { value: 5, message: 'Не короче 5 символов' },
                  maxLength: { value: 20, message: 'Пароль не должен превышать 20 символов' },
                })}
                placeholder='Повторите новый пароль'
                type='password'
                error={errors.repeatNewPassword}
              />
            </div>
            <Button appearance='primary' disabled={!isValid}>
              Сохранить
            </Button>
            <span className={styles.hide} onClick={closeChangePassword}>
              Скрыть
            </span>
          </form>
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
