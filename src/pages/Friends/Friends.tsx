import React from 'react';
import styles from './Friends.module.scss';
import { socket } from '../../helpers/socket';
import { useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';

export const Friends = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [friends, setFriends] = React.useState<any[]>([]);
  console.log(friends);

  React.useEffect(() => {
    socket.emit('friends:get', { userId: user.id });
    socket.on('friends:set', ({ friendsUser }) => {
      setFriends(friendsUser);
    });
  }, []);

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
