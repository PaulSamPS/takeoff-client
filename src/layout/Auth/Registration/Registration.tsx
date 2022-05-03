import React from 'react';
import Select from 'react-select';
import { Input } from '../../../components/Input/Input';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getLevel, getPosition } from '../../../redux/actions/positionAction';
import { ISelectOption } from '../../../interfaces/select.interface';
import { optionsCreator } from '../../../helpers/optionsCrearot';
import { IRegistrationForm } from '../../../interfaces/registrationForm.interface';
import styles from '../AuthLayout.module.scss';
import './select.scss';

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<IRegistrationForm>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const { position } = useAppSelector((state) => state.positionReducer);
  const { level } = useAppSelector((state) => state.levelReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const optionsPosition: ISelectOption[] = [];
  const optionsLevel: ISelectOption[] = [];

  optionsCreator(position, optionsPosition);
  optionsCreator(level, optionsLevel);

  const handleChangeMethod = () => {
    navigate('/');
  };

  const onSubmit = async (formData: IRegistrationForm) => {
    if (typeof formData.position !== 'string') {
      formData.position = formData.position.value;
    }
    if (typeof formData.level !== 'string') {
      formData.level = formData.level.value;
    }
    console.log(formData);
  };

  React.useEffect(() => {
    dispatch(getPosition());
    dispatch(getLevel());
  }, []);

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Input
        {...register('name', { required: { value: true, message: 'Введите имя' } })}
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
      <Input
        {...register('email', { required: { value: true, message: 'Введите email' } })}
        placeholder='Email'
        type='email'
        error={errors.email}
      />
      <Controller
        name='position'
        control={control}
        rules={{ required: true }}
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
        rules={{ required: true }}
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
      <div className={styles.submit}>
        <button type='submit' disabled={!isValid} className={styles.btn}>
          Регистрация
        </button>
      </div>
      <span className={styles.forgotPassword} onClick={handleChangeMethod}>
        Войти
      </span>
    </motion.form>
  );
};
