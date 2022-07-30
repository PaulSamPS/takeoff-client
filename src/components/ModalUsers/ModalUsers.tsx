import React from 'react';
import styles from './ModalUsers.module.scss';
import { API_URL } from '../../http/axios';
import { Link } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest';

export const ModalUsers = () => {
  const { friendsUserInfo } = useRequest();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <span>{'Друзья' + ' ' + friendsUserInfo.length}</span>
      </div>
      <div className={styles.usersList}>
        {friendsUserInfo.map((friend) => (
          <div key={friend.id} className={styles.user}>
            <Link to={`/main/profile/${friend.id}`} className={styles.avatar}>
              <img
                src={friend.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend.avatar}`}
                alt={friend.firstName + '' + friend.lastName}
              />
            </Link>
            <Link to={`/main/profile/${friend.id}`} className={styles.name}>
              <span>{friend.firstName}</span>
              <span>{friend.lastName}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
