import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ILoginForm } from '../../../interfaces/loginForm.interface';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Spinner } from '../../../components/Spinner/Spinner';
import { Button } from '../../../components/Button/Button';
import styles from '../Auth.module.scss';
import { IResponseUser } from '../../../interfaces/user.interface';
import { setSuccess } from '../../../redux/reducers/auth/loginReducer';
import { socket } from '../../../helpers/socket';

export const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ILoginForm>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const { error, isLoading } = useAppSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSwitchMethod = () => {
    navigate('/registration');
  };

  const onSubmit = async (formData: ILoginForm) => {
    socket.emit('login', { name: formData.name, password: formData.password });

    socket.once('login:success', ({ accessToken, user }: IResponseUser) => {
      dispatch(setSuccess(user));
      localStorage.setItem('AccessToken', 'Bearer ' + accessToken);
    });
    // await dispatch(login(formData));
    reset();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (localStorage.getItem('AccessToken')) {
    navigate('/main');
  }

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {error && <span className={styles.err}>{error}</span>}
      <Input
        {...register('name', {
          required: { value: true, message: 'Введите имя' },
        })}
        placeholder='Логин'
        type='text'
        error={errors.name}
      />
      <Input
        {...register('password', { required: { value: true, message: 'Введите пароль' } })}
        placeholder='Пароль'
        type='password'
        error={errors.password}
      />
      <Button appearance='primary' type='submit' disabled={!isValid}>
        Войти
      </Button>
      <div className={styles.switchBlock}>
        Нет аккаунта?
        <span className={styles.switch} onClick={handleSwitchMethod}>
          Зарегистрироваться
        </span>
      </div>
    </motion.form>
  );
};
