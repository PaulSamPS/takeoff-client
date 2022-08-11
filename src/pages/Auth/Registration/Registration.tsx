import React from 'react';
import Select from 'react-select';
import { Input } from '../../../components/UI/Input/Input';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../hooks/redux';
import { IRegistrationForm } from '../../../interfaces/registrationForm.interface';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { Button } from '../../../components/UI/Button/Button';
import styles from '../Auth.module.scss';
import './select.scss';
import { gender } from '../../../helpers/optionsSelect/gender';
import { useRegistration } from '../../../hooks/useRegistration';
import { city } from '../../../helpers/optionsSelect/city';

export const Registration = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<IRegistrationForm>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const { isLoading, error } = useAppSelector((state) => state.registrationReducer);
  const { handleSwitchMethod, onSubmit } = useRegistration({ reset, error });

  const optionsGender = gender();
  const optionsCity = city();

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
        {...register('firstName', {
          required: { value: true, message: 'Введите имя' },
          minLength: { value: 3, message: 'Не короче  3 символов' },
          maxLength: { value: 15, message: 'Имя не должно превышать 20 символов' },
        })}
        placeholder='Имя'
        type='text'
        error={errors.firstName}
      />
      <Input
        {...register('lastName', {
          required: { value: true, message: 'Введите имя' },
          minLength: { value: 3, message: 'Не короче  3 символов' },
          maxLength: { value: 15, message: 'Имя не должно превышать 20 символов' },
        })}
        placeholder='Фамилия'
        type='text'
        error={errors.lastName}
      />
      <Input
        {...register('password', {
          required: { value: true, message: 'Введите пароль' },
          minLength: { value: 5, message: 'Не короче 5 символов' },
          maxLength: { value: 20, message: 'Пароль не должен превышать 20 символов' },
        })}
        placeholder='Пароль'
        type='password'
        error={errors.password}
      />
      <Input
        {...register('email', {
          required: { value: true, message: 'Введите email' },
          pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/g, message: 'Неверный формат  email' },
        })}
        placeholder='Email'
        type='email'
        error={errors.email}
      />
      <Controller
        name='gender'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            className={styles.selectContainer}
            classNamePrefix='select'
            options={optionsGender}
            placeholder='Выберите пол'
          />
        )}
      />
      <Controller
        name='city'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            className={styles.selectContainer}
            classNamePrefix='select'
            options={optionsCity}
            placeholder='Выберите город'
          />
        )}
      />
      <div className={styles.submit}>
        <Button appearance='primary' type='submit' disabled={!isValid}>
          Регистрация
        </Button>
      </div>
      <div className={styles.switchBlock}>
        Есть аккаунт?
        <span className={styles.switch} onClick={handleSwitchMethod}>
          Войти
        </span>
      </div>
    </motion.form>
  );
};
