import React from 'react';
import styles from './EditBasic.module.scss';
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

export const EditBasic = () => {
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
        <span>????????????????</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.main}>
        <div className={styles.item}>
          <label>??????:</label>
          <Input
            {...register('firstName', {
              minLength: { value: 3, message: '???? ????????????  3 ????????????????' },
              maxLength: { value: 15, message: '?????? ???? ???????????? ?????????????????? 20 ????????????????' },
            })}
            placeholder={loginUser.firstName}
            type='text'
            error={errors.firstName}
          />
        </div>
        <div className={styles.item}>
          <label>??????????????:</label>
          <Input
            {...register('lastName', {
              minLength: { value: 3, message: '???? ????????????  3 ????????????????' },
              maxLength: { value: 15, message: '?????????????? ???? ???????????? ?????????????????? 20 ????????????????' },
            })}
            placeholder={loginUser.lastName}
            type='text'
            error={errors.lastName}
          />
        </div>
        <div className={styles.item}>
          <label>??????</label>
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={genderOptions}
                placeholder={loginUser.bio.gender ? loginUser.bio.gender : '???????????????? ??????'}
              />
            )}
          />
        </div>
        <div className={styles.item}>
          <label>???????????????? ??????????????????:</label>
          <Controller
            name='familyStatus'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={familyStatusOptions}
                placeholder={loginUser.bio.familyStatus ? loginUser.bio.familyStatus : '???? ??????????????'}
              />
            )}
          />
        </div>
        <div className={styles.item}>
          <label>???????? ????????????????:</label>
          <Controller
            name='day'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={optionsDay}
                placeholder={loginUser.bio.birthday.day ? loginUser.bio.birthday.day : '????????'}
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
                placeholder={loginUser.bio.birthday.month ? loginUser.bio.birthday.month : '??????????'}
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
                placeholder={loginUser.bio.birthday.year ? loginUser.bio.birthday.year : '??????'}
              />
            )}
          />
        </div>
        <div className={styles.bottom}>
          <Button appearance='primary' type='submit'>
            ??????????????????
          </Button>
          {saved && <span>??????????????????</span>}
        </div>
      </form>
    </div>
  );
};
