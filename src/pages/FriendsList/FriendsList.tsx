import React from 'react';
import styles from './Friendslist.module.scss';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { Outlet } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest';

export const FriendsList = () => {
  const { request } = useRequest();

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <CustomLink to='' className={styles.name}>
          Друзья
        </CustomLink>
        <CustomLink to='requests' className={styles.name}>
          Заявки в друзья {request.length > 0 && <div>{request.length}</div>}
        </CustomLink>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};
