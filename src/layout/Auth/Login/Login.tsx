import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ILoginForm } from '../../../interfaces/loginForm.interface';
import styles from '../AuthLayout.module.scss';

export const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const navigate = useNavigate();

  const handleChangeMethod = () => {
    navigate('/registration');
  };

  const onSubmit = async (formData: ILoginForm) => {
    console.log(formData);
  };

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
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
      <span className={styles.forgotPassword} onClick={handleChangeMethod}>
        Регистрация
      </span>
    </motion.form>
  );
};
