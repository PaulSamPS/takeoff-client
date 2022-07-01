import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Friendslist.module.scss';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { useScroll } from '../../hooks/usseScroll';
import { Count } from '../../components/Count/Count';
import { useRequest } from '../../hooks/useRequest';

export const FriendsList = () => {
  const { scrollY } = useScroll();
  const { request } = useRequest();
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
          Мои друзья
        </CustomLink>
        <CustomLink to={'/main/friends/requests'} appearance='rightMenu'>
          Заявки в друзья{' '}
          {request.length > 0 && <Count className={styles.count}>{request.length}</Count>}
        </CustomLink>
      </div>
    </div>
  );
};
