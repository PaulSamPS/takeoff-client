import React from 'react';
import styles from './Requests.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { Button } from '../../components/Button/Button';
import { useAppSelector } from '../../hooks/redux';
import { socket } from '../../helpers/socket';

export const Requests = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const addFriend = (addFriendUserId: string) => {
    console.log(addFriendUserId);
  };

  const [request, setRequest] = React.useState<any[]>([]);

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
              <Button
                appearance='transparent'
                className={styles.done}
                onClick={() => addFriend(f.id)}
              >
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
