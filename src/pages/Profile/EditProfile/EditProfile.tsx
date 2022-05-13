import React from 'react';
import { motion } from 'framer-motion';
import { EditProfileProps } from './EditProfile.props';
import { Input } from '../../../components/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { IEditProfileForm } from '../../../interfaces/editProfile.interface';
import { Button } from '../../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { adminUpdateUser, updateUser } from '../../../redux/actions/usersAction';
import cn from 'classnames';
import styles from './EditProfile.module.scss';
import Select from 'react-select';
import { ISelectOption } from '../../../interfaces/select.interface';
import { optionsCreator } from '../../../helpers/optionsCrearot';
import '../../Auth/Registration/select.scss';
import { getLevel, getPosition } from '../../../redux/actions/positionAction';

export const EditProfile = ({
  className,
  isOpen,
  setIsOpen,
  adminUser,
}: EditProfileProps): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);

  const { position } = useAppSelector((state) => state.positionReducer);
  const { level } = useAppSelector((state) => state.levelReducer);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IEditProfileForm>({ mode: 'onChange', reValidateMode: 'onBlur' });

  const optionsPosition: ISelectOption[] = [];
  const optionsLevel: ISelectOption[] = [];

  optionsCreator(position, optionsPosition);
  optionsCreator(level, optionsLevel);

  const variants = {
    visibleEdit: { opacity: 1, height: 'auto', marginTop: 15 },
    hiddenEdit: { opacity: 0, height: 0, marginTop: 0 },
  };

  const onSubmit = async (formData: IEditProfileForm) => {
    if (formData.name || formData.email || formData.position || formData.level != '') {
      if (!adminUser) {
        dispatch(updateUser(user.id, formData)).then(() => {
          setIsOpen(false);
          reset();
        });
      } else {
        if (formData.position) {
          if (typeof formData.position !== 'string') {
            formData.position = formData.position.value;
          }
        }
        if (formData.level) {
          if (typeof formData.level !== 'string') {
            formData.level = formData.level.value;
          }
        }
        dispatch(adminUpdateUser(adminUser, formData)).then(() => {
          setIsOpen(false);
          reset();
        });
      }
    }
  };

  React.useEffect(() => {
    dispatch(getPosition());
    dispatch(getLevel());
  }, []);

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
