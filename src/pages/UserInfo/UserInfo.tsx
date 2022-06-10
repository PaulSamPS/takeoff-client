import React from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import styles from './UserInfo.module.scss';
import { socket } from '../../helpers/socket';
import { calculateTime } from '../../helpers/calculateTime';
import { IUserAll } from '../../interfaces/user.interface';
import { API_URL } from '../../http/axios';
import { Info } from '../../components/Info/Info';
import { Button } from '../../components/Button/Button';

interface IUserInfo {
  user: IUserAll;
}

export const UserInfo = () => {
  const { users } = useChat();
  const { id } = useParams();
  const [user, setUser] = React.useState<IUserAll>();
  const usersOnline = users.map((user: any) => user.userId);

  React.useEffect(() => {
    socket.emit('userInfo: get', { userId: id });
    socket.on('userInfo:user', ({ user }: IUserInfo) => {
      return setUser(user);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <img
            src={user?.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
            alt={user?.name}
          />
        </div>
        <div className={styles.bio}>
          {usersOnline.includes(id) ? (
            <div className={styles.online}>
              Online <div className={styles.green} />
            </div>
          ) : (
            <div className={styles.lastVisit}>
              Был в сети {user && calculateTime(user.lastVisit)}
            </div>
          )}
          <h1>{user?.name}</h1>
          <Info user={user} />
        </div>
        <Button appearance='primary'>Написать</Button>
      </div>
    </div>
  );
};
