import React from 'react';
import styles from './Requests.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { Button } from '../../../components/UI/Button/Button';
import { useRequest } from '../../../hooks/useRequest';

export const FriendsRequests = (): JSX.Element => {
  const { request, addFriend, rejectFriend } = useRequest();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>Заявки в друзья</div>
      <div className={styles.grid}>
        {request.length > 0 ? (
          request.map((f) => (
            <div className={styles.request} key={f.id}>
              <div className={styles.card}>
                <Link to={`/main/profile/${f.id}`} replace className={styles.followers}>
                  <img
                    src={f.avatar == null ? `/photo.png` : `${API_URL}/avatar/${f.avatar}`}
                    alt={f.name.firstName + ' ' + f.name.lastName}
                  />
                </Link>
                <Link to={`/main/profile/${f.id}`} className={styles.userName}>
                  {f.name.firstName + ' ' + f.name.lastName}
                </Link>
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
