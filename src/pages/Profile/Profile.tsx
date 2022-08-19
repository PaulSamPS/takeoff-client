import React from 'react';
import styles from './Profile.module.scss';
import { IUser } from '../../interfaces/user.interface';
import { SocketContext } from '../../helpers/socketContext';
import { Avatar, Bio, Friends, Post } from '../../components/Profile';
import { useParams } from 'react-router-dom';

export const Profile = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const [user, setUser] = React.useState<IUser>();

  const { id } = useParams();

  React.useEffect(() => {
    socket?.emit('userInfo:get', { userId: id });
    socket?.on('userInfo:user', ({ user }: { user: IUser }) => {
      setUser(user);
    });

    return () => {
      socket?.off('userInfo:user');
    };
  }, [id, socket]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Avatar user={user} />
        <Friends />
      </div>
      <div className={styles.right}>
        <Bio user={user} />
        <Post />
      </div>
    </div>
  );
};
