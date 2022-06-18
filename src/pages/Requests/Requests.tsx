import React from 'react';
import styles from './Requests.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { Button } from '../../components/Button/Button';
import { useRequest } from '../../hooks/useRequest';

export const Requests = () => {
  const { request, addFriend, rejectFriend } = useRequest();

  return (
    <div className={styles.followersWrapper}>
      <div className={styles.grid}>
        {request.length > 0 ? (
          request.map((f) => (
            <div className={styles.request} key={f.id}>
              <Link to={`/main/user-info/${f.id}`} replace className={styles.followers}>
                <img
                  src={f.avatar == null ? `/photo.png` : `${API_URL}/avatar/${f.avatar}`}
                  alt={f.name}
                />
              </Link>
              <span className={styles.userName}>{f.name}</span>
              <Button
                appearance='transparent'
                className={styles.done}
                onClick={() => addFriend(f.id)}
              >
                Принять
              </Button>
              <Button
                appearance='transparent'
                className={styles.done}
                onClick={() => rejectFriend(f.id)}
              >
                Отклонить
              </Button>
            </div>
          ))
        ) : (
          <h3>Пока нет запросов</h3>
        )}
      </div>
    </div>
  );
};
