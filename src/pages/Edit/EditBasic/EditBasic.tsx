import React from 'react';
import styles from './EditBasic.module.scss';
import { Input } from '../../../components/UI/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { IRegistrationForm } from '../../../interfaces/registrationForm.interface';
import Select from 'react-select';
import { useFamilyStatus } from '../../../hooks/useFamilyStatus';
import { useAppSelector } from '../../../hooks/redux';

export const EditBasic = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useForm<IRegistrationForm>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const optionsFamilyStatus = useFamilyStatus();
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <span>Основное</span>
      </div>
      <div className={styles.main}>
        <div className={styles.item}>
          <label>Имя:</label>
          <Input
            {...register('firstName', {
              required: { value: true, message: 'Введите имя' },
              minLength: { value: 3, message: 'Не короче  3 символов' },
              maxLength: { value: 15, message: 'Имя не должно превышать 20 символов' },
            })}
            placeholder={loginUser.firstName}
            type='text'
            error={errors.firstName}
          />
        </div>
        <div className={styles.item}>
          <label>Фамилия:</label>
          <Input
            {...register('lastName', {
              required: { value: true, message: 'Введите фамилию' },
              minLength: { value: 3, message: 'Не короче  3 символов' },
              maxLength: { value: 15, message: 'Фамилия не должно превышать 20 символов' },
            })}
            placeholder={loginUser.lastName}
            type='text'
            error={errors.lastName}
          />
        </div>
        <div className={styles.item}>
          <label>Город:</label>
          <Controller
            name='city'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={optionsFamilyStatus}
                placeholder='Выберите город'
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
