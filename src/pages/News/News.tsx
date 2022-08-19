import React from 'react';
import styles from './News.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { RightBar } from '../../components/RightBar/RightBar';
import { CreateNews } from '../../components/News/CreateNews/CreateNews';
import { NewsList } from '../../components/News/NewsList/NewsList';

export const News = (): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CreateNews />
        <NewsList />
      </div>
      <RightBar
        firstItem={'Все посты'}
        secondItem={'Мои посты'}
        firstItemLink={'/main/news'}
        secondItemLink={`/main/news/${loginUser.id}`}
      />
    </div>
  );
};
