import React from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import styles from '../Conversations/Conversations.module.scss';
import { socket } from '../../helpers/socket';
import { calculateTime } from '../../helpers/calculateTime';
import { IUserAll } from '../../interfaces/user.interface';

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
    <div>
      <h1>{user?.name}</h1>
      <div>123</div>
      {usersOnline.includes(id) ? (
        <div className={styles.online}>Online</div>
      ) : (
        <div>Был в сети{user && calculateTime(user.lastVisit)}</div>
      )}
    </div>
  );
};
