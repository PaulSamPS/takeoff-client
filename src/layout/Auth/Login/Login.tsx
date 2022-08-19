import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/UI/Input/Input';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ILoginForm } from '../../../interfaces/loginForm.interface';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { Button } from '../../../components/UI/Button/Button';
import styles from '../Auth.module.scss';
import { login } from '../../../redux/actions/authAction';

export const Login = (): JSX.Element => {
  const { error, isLoading } = useAppSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ILoginForm>({ mode: 'onChange', reValidateMode: 'onBlur' });

  const handleSwitchMethod = () => {
    navigate('registration');
  };

  const onSubmit = async (formData: ILoginForm) => {
    dispatch(login(formData)).then(() => {
      if (localStorage.getItem('AccessToken')) {
        navigate('main/news');
      }
    });
    reset();
  };

  if (isLoading) {
    return <Spinner />;
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
        className={styles.input}
        {...register('email', {
          required: { value: true, message: 'Введите email' },
          pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/g, message: 'Неверный формат  email' },
        })}
        placeholder='Email'
        type='email'
        error={errors.email}
      />
      <Input
        className={styles.input}
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
