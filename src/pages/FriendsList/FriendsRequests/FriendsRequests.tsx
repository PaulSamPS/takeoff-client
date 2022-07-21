import React from 'react';
import styles from './FriendsRequests.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { Button } from '../../../components/UI/Button/Button';
import { useRequest } from '../../../hooks/useRequest';

export const FriendsRequests = () => {
  const { request, addFriend, rejectFriend } = useRequest();

  return (
    <div
      className={styles.wrapper}
      style={{ height: request.length > 0 ? 'fit-content' : 'calc(100vh - 216px)' }}
    >
      <div className={styles.top}>Заявки в друзья</div>
      <div
        className={styles.grid}
        style={{
          display: request.length > 0 ? 'block' : 'flex',
          justifyContent: request.length > 0 ? '' : 'center',
        }}
      >
        {request.length > 0 ? (
          request.map((f) => (
            <div className={styles.request} key={f.id}>
              <div className={styles.card}>
                <Link to={`/main/people/${f.id}`} replace className={styles.followers}>
                  <img
                    src={f.avatar == null ? `/photo.png` : `${API_URL}/avatar/${f.avatar}`}
                    alt={f.name}
                  />
                </Link>
                <span className={styles.userName}>{f.name}</span>
                <div className={styles.action}>
                  <Button
                    appearance='primary'
                    className={styles.done}
                    onClick={() => addFriend(f.id)}
                  >
                    Принять заявку
                  </Button>
                  <Button
                    appearance='transparent'
                    className={styles.done}
                    onClick={() => rejectFriend(f.id)}
                  >
                    Отклонить
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className={styles.noRequests}>Пока нет запросов</span>
        )}
      </div>
    </div>
  );
};
