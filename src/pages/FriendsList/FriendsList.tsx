import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Friendslist.module.scss';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { useScroll } from '../../hooks/usseScroll';

export const FriendsList = () => {
  const { scrollY } = useScroll();
  console.log(scrollY);
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <div
        className={styles.rightMenu}
        style={{
          position: scrollY >= 20 ? 'sticky' : 'relative',
          top: scrollY >= 20 ? '71px' : '0',
        }}
      >
        <CustomLink to={'/main/friends'} appearance='rightMenu'>
          Друзья
        </CustomLink>
        <CustomLink to={'/main/friends/requests'} appearance='rightMenu'>
          Заявки в друзья
        </CustomLink>
      </div>
    </div>
  );
};
