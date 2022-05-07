import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ILoginForm } from '../../../interfaces/loginForm.interface';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login } from '../../../redux/actions/authAction';
import { Spinner } from '../../../components/Spinner/Spinner';
import styles from '../Auth.module.scss';

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
    await dispatch(login(formData));
    if (localStorage.getItem('AccessToken')) {
      navigate('/main');
    }
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
      <div className={styles.submit}>
        <button type='submit' disabled={!isValid} className={styles.btn}>
          Войти
        </button>
      </div>
      <span className={styles.switch} onClick={handleSwitchMethod}>
        Регистрация
      </span>
    </motion.form>
  );
};
