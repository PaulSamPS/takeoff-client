import React from 'react';
import { RightBar } from '../../components/RightBar/RightBar';
import { Outlet } from 'react-router-dom';
import styles from './Edit.module.scss';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const Edit = (): JSX.Element => {
  const { screenWidth } = useScreenWidth();
  return (
    <div className={styles.wrapper}>
      <Outlet />
      {screenWidth > 1000 && (
        <RightBar
          firstItem={'Основное'}
          secondItem={'Контакты'}
          firstItemLink={'/main/edit'}
          secondItemLink={'/main/edit/contacts'}
        />
      )}
    </div>
  );
};
