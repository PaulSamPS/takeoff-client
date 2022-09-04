import React from 'react';
import styles from './News.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { RightBar } from '../../components/RightBar/RightBar';
import { CreateNews, NewsList } from '../../components/News';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const News = (): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const { screenWidth } = useScreenWidth();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CreateNews />
        <NewsList />
      </div>
      {screenWidth > 1000 && (
        <RightBar
          className={styles.rightBar}
          firstItem={'Все посты'}
          secondItem={'Мои посты'}
          firstItemLink={'/main/news'}
          secondItemLink={`/main/news/${loginUser.id}`}
        />
      )}
    </div>
  );
};
