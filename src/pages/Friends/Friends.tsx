import React from 'react';
import styles from './Friends.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { useRequest } from '../../hooks/useRequest';

export const Friends = () => {
  const { friends } = useRequest();
  return (
    <div className={styles.followersWrapper}>
      <div className={styles.grid}>
        {friends.length > 0 &&
          friends.map((f) => (
            <div className={styles.request} key={f.id}>
              <Link to={`/main/user-info/${f.id}`} replace className={styles.followers}>
                <img
                  src={f.avatar == null ? `/photo.png` : `${API_URL}/avatar/${f.avatar}`}
                  alt={f.name}
                />
              </Link>
              <span className={styles.userName}>{f.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
