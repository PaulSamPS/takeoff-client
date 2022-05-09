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
import { registration } from '../../../redux/actions/authAction';
import { Spinner } from '../../../components/Spinner/Spinner';
import { Button } from '../../../components/Button/Button';
import styles from '../Auth.module.scss';
import './select.scss';

export const Registration = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<IRegistrationForm>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const { isLoading, status, error } = useAppSelector((state) => state.registrationReducer);
  const { position } = useAppSelector((state) => state.positionReducer);
  const { level } = useAppSelector((state) => state.levelReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const optionsPosition: ISelectOption[] = [];
  const optionsLevel: ISelectOption[] = [];

  optionsCreator(position, optionsPosition);
  optionsCreator(level, optionsLevel);

  const handleSwitchMethod = () => {
    navigate('/');
  };

  const onSubmit = async (formData: IRegistrationForm) => {
    if (typeof formData.position !== 'string') {
      formData.position = formData.position.value;
    }
    if (typeof formData.level !== 'string') {
      formData.level = formData.level.value;
    }
    await dispatch(registration(formData));
    reset();
  };

  React.useEffect(() => {
    dispatch(getPosition());
    dispatch(getLevel());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (status === 200) {
    return (
      <h2 className={styles.success}>
        Успешная регистрация, теперь вы можете
        <span className={styles.switch} onClick={handleSwitchMethod}>
          войти
        </span>
      </h2>
    );
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
          minLength: { value: 3, message: 'Не короче  3 символов' },
          maxLength: { value: 15, message: 'Имя не должно превышать 15 символов' },
        })}
        placeholder='Логин'
        type='text'
        error={errors.name}
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
