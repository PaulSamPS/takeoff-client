import React, { ChangeEvent } from 'react';
import styles from './SelectDateOfBirthday.module.scss';
import moment from 'moment';

export const SelectDateOfBirth = () => {
  const [birthday, setBirthday] = React.useState<string>('');
  console.log(moment(birthday).format('D MMMM'));

  return (
    <input
      className={styles.wrapper}
      type='date'
      min='1980-01-01'
      max={Date.now()}
      value={birthday}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)}
    />
  );
};
