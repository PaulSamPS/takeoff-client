import React from 'react';
import styles from './ProfileFriends.module.scss';
import { useRequest } from '../../../hooks/useRequest';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../http/axios';

export const ProfileFriends = () => {
  const { friendsUserInfo } = useRequest();
  return (
    <div className={styles.wrapper}>
      <div className={styles.friendsCount}>
        Друзья <span className={styles.count}>{friendsUserInfo.length}</span>
      </div>
      <div className={styles.friendsGrid}>
        {friendsUserInfo.map((friend) => (
          <div key={friend.id} className={styles.friend}>
            <Link to={`/main/profile/${friend.id}`} className={styles.avatar}>
              <img
                src={friend.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend.avatar}`}
                alt={friend.name}
              />
            </Link>
            <Link className={styles.name} to={`/main/profile/${friend.id}`}>
              {friend.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
