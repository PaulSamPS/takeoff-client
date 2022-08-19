import React from 'react';
import styles from './Basic.module.scss';
import { Input } from '../../../components/UI/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateUser } from '../../../redux/actions/usersAction';
import { Button } from '../../../components/UI/Button/Button';
import Select from 'react-select';
import { day, month, year } from '../../../helpers/optionsSelect/birthday';
import { IEditProfile } from '../../../interfaces/editProfile.interface';
import { gender } from '../../../helpers/optionsSelect/gender';
import { familyStatus } from '../../../helpers/optionsSelect/familyStatus';

export const Basic = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IEditProfile>({ mode: 'onChange', reValidateMode: 'onBlur' });
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [saved, setSaved] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const optionsDay = day();
  const optionsMonth = month();
  const optionsYear = year();
  const genderOptions = gender();
  const familyStatusOptions = familyStatus();

  const onSubmit = async (formData: IEditProfile) => {
    if (formData.gender && typeof formData.gender !== 'string') {
      formData.gender = formData.gender.value;
    }
    if (formData.familyStatus && typeof formData.familyStatus !== 'string') {
      formData.familyStatus = formData.familyStatus.value;
    }
    if (formData.day && typeof formData.day !== 'string') {
      formData.day = formData.day.value;
    }
    if (formData.month && typeof formData.month !== 'string') {
      formData.month = formData.month.value;
    }
    if (formData.year && typeof formData.year !== 'string') {
      formData.year = formData.year.value;
    }
    await dispatch(updateUser(loginUser.id, formData)).then(() => {
      setSaved(true);
    });
  };

  React.useEffect(() => {
    setSaved && setTimeout(() => setSaved(false), 3000);
  }, [saved]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <span>Основное</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.main}>
        <div className={styles.item}>
          <label>Имя:</label>
          <Input
            {...register('firstName', {
              minLength: { value: 3, message: 'Не короче  3 символов' },
              maxLength: { value: 15, message: 'Имя не должно превышать 20 символов' },
            })}
            placeholder={loginUser.name.firstName}
            type='text'
            error={errors.firstName}
          />
        </div>
        <div className={styles.item}>
          <label>Фамилия:</label>
          <Input
            {...register('lastName', {
              minLength: { value: 3, message: 'Не короче  3 символов' },
              maxLength: { value: 15, message: 'Фамилия не должно превышать 20 символов' },
            })}
            placeholder={loginUser.name.lastName}
            type='text'
            error={errors.lastName}
          />
        </div>
        <div className={styles.item}>
          <label>Пол</label>
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={genderOptions}
                placeholder={loginUser.bio.gender ? loginUser.bio.gender : 'Выберите пол'}
              />
            )}
          />
        </div>
        <div className={styles.item}>
          <label>Семейное положение:</label>
          <Controller
            name='familyStatus'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={familyStatusOptions}
                placeholder={loginUser.bio.familyStatus ? loginUser.bio.familyStatus : 'Не выбрано'}
              />
            )}
          />
        </div>
        <div className={styles.item}>
          <label>Дата рождения:</label>
          <Controller
            name='day'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={optionsDay}
                placeholder={loginUser.bio.birthday.day ? loginUser.bio.birthday.day : 'День'}
              />
            )}
          />
          <Controller
            name='month'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={optionsMonth}
                placeholder={loginUser.bio.birthday.month ? loginUser.bio.birthday.month : 'Месяц'}
              />
            )}
          />
          <Controller
            name='year'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={optionsYear}
                placeholder={loginUser.bio.birthday.year ? loginUser.bio.birthday.year : 'Год'}
              />
            )}
          />
        </div>
        <div className={styles.bottom}>
          <Button appearance='primary' type='submit'>
            Сохранить
          </Button>
          {saved && <span>Сохранено</span>}
        </div>
      </form>
    </div>
  );
};
