import React from 'react';
import styles from '../EditBasic/EditBasic.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { IEditProfile } from '../../../interfaces/editProfile.interface';
import Select from 'react-select';
import { city } from '../../../helpers/optionsSelect/city';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Button } from '../../../components/UI/Button/Button';
import { updateUser } from '../../../redux/actions/usersAction';

export const EditContacts = (): JSX.Element => {
  const { control, handleSubmit } = useForm<IEditProfile>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const dispatch = useAppDispatch();

  const [saved, setSaved] = React.useState<boolean>(false);

  const optionsCity = city();

  const onSubmit = async (formData: IEditProfile) => {
    if (formData.city && typeof formData.city !== 'string') {
      formData.city = formData.city.value;
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
        <span>Контакты</span>
      </div>
      <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.item}>
          <label>Город:</label>
          <Controller
            name='city'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.selectContainer}
                classNamePrefix='select'
                options={optionsCity}
                placeholder={loginUser.bio.city ? loginUser.bio.city : 'Выберите город'}
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
