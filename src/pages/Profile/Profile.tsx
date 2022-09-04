import React from 'react';
import styles from './Profile.module.scss';
import { IUser } from '../../interfaces/user.interface';
import { SocketContext } from '../../helpers/socketContext';
import { Avatar, Bio, Friends, Post } from '../../components/Profile';
import { useParams } from 'react-router-dom';

export const Profile = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const [user, setUser] = React.useState<IUser>();
  const [isLoadingUserInfo, setIsLoadingUserInfo] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    setIsLoadingUserInfo(true);
    socket?.emit('userInfo:get', { userId: id });
    socket?.on('userInfo:user', ({ user }: { user: IUser }) => {
      setUser(user);
      setIsLoadingUserInfo(false);
    });

    return () => {
      socket?.off('userInfo:user');
    };
  }, [id, socket]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Avatar user={user} isLoadingUserInfo={isLoadingUserInfo} />
        <Friends isLoadingUserInfo={isLoadingUserInfo} />
      </div>
      <div className={styles.right}>
        <Bio user={user} isLoadingUserInfo={isLoadingUserInfo} />
        <Post isLoadingUserInfo={isLoadingUserInfo} />
      </div>
    </div>
  );
};
