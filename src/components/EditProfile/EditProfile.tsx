import React from 'react';
import { motion } from 'framer-motion';
import { EditProfileProps } from './EditProfile.props';
import { Input } from '../Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { IEditProfileForm } from '../../interfaces/editProfile.interface';
import { Button } from '../Button/Button';
import '../../pages/Auth/Registration/select.scss';
import { useLevel } from '../../hooks/useLevel';
import { usePosition } from '../../hooks/usePosition';
import { useEditProfile } from '../../hooks/useEditProfile';
import Select from 'react-select';
import cn from 'classnames';
import styles from './EditProfile.module.scss';

export const EditProfile = ({
  className,
  isOpen,
  setIsOpen,
  adminUser,
}: EditProfileProps): JSX.Element => {
  const optionsPosition = usePosition();
  const optionsLevel = useLevel();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IEditProfileForm>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const onSubmit = useEditProfile({ setIsOpen, adminUser, reset });

  const variants = {
    visibleEdit: { opacity: 1, height: 'auto', marginTop: 15 },
    hiddenEdit: { opacity: 0, height: 0, marginTop: 0 },
  };

  return (
    <motion.form
      className={cn(styles.wrapper, className)}
      onSubmit={handleSubmit(onSubmit)}
      animate={isOpen ? 'visibleEdit' : 'hiddenEdit'}
      variants={variants}
      initial={'hiddenEdit'}
      exit={'hiddenEdit'}
      transition={{
        damping: 20,
        type: 'spring',
        stiffness: 360,
      }}
    >
      <label htmlFor='name'>
        Логин:
        <Input
          {...register('name', {
            minLength: { value: 3, message: 'Не короче  3 символов' },
            maxLength: { value: 15, message: 'Имя не должно превышать 15 символов' },
          })}
          placeholder='Введите новый логин'
          type='text'
          error={errors.name}
        />
      </label>
      <label htmlFor='email'>
        Email:
        <Input
          {...register('email', {
            pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/g, message: 'Неверный формат  email' },
          })}
          placeholder='Введите новый email'
          type='email'
          error={errors.email}
        />
      </label>
      {adminUser != null && (
        <>
          <Controller
            name='position'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={optionsPosition}
                placeholder='Выберите позицию'
              />
            )}
          />
          <Controller
            name='level'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={optionsLevel}
                placeholder='Выберите уровень'
              />
            )}
          />
        </>
      )}
      <div className={styles.submit}>
        <Button appearance='primary' type='submit'>
          Изменить
        </Button>
      </div>
    </motion.form>
  );
};
