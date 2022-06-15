import React from 'react';
import styles from './Friends.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { Button } from '../../components/Button/Button';
import { socket } from '../../helpers/socket';
import { useAppSelector } from '../../hooks/redux';

export const Friends = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [request, setRequest] = React.useState<any[]>([]);

  const addFriend = (addFriendUserId: string) => {
    console.log(addFriendUserId);
  };

  React.useEffect(() => {
    socket.emit('friendsRequest:get', {
      userId: user.id,
    });
    socket.on('friendsRequest:sent', ({ followersUser }) => {
      setRequest(followersUser);
    });
    socket.on('followings:done', ({ followingsUser }) => {
      setRequest(followingsUser);
    });
  }, []);

  return (
    <div className={styles.followersWrapper}>
      <div className={styles.name}>
        Заявки в друзья <div>{request.length}</div>
      </div>
      <div className={styles.grid}>
        {request.length > 0 &&
          request.map((f) => (
            <div className={styles.request} key={f.id}>
              <Link to={`/main/user-info/${f.id}`} replace className={styles.followers}>
                <img
                  src={f.avatar == null ? `/photo.png` : `${API_URL}/avatar/${f.avatar}`}
                  alt={f.name}
                />
              </Link>
              <span className={styles.userName}>{f.name}</span>
              <Button appearance='primary' className={styles.done} onClick={() => addFriend(f.id)}>
                Принять
              </Button>
              <Button appearance='transparent' className={styles.done}>
                Отклонить
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};
