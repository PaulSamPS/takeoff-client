import React from 'react';
import { RightBar } from '../../components/RightBar/RightBar';
import { Outlet } from 'react-router-dom';
import styles from './Edit.module.scss';

export const Edit = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <RightBar
        firstItem={'Основное'}
        secondItem={'Контакты'}
        firstItemLink={'/main/edit'}
        secondItemLink={'/main/edit/contacts'}
      />
    </div>
  );
};
