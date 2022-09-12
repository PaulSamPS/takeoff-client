import React from 'react';
import { RightBar } from '../../components/RightBar/RightBar';
import { Outlet } from 'react-router-dom';

import styles from './Edit.module.scss';

export const Edit = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <RightBar
        className={styles.rightBar}
        firstItem={'Основное'}
        secondItem={'Контакты'}
        firstItemLink={'/main/edit'}
        secondItemLink={'/main/edit/contacts'}
      />
    </div>
  );
};
