import React from 'react';
import styles from './Profile.module.scss';
import { IUser } from '../../interfaces/user.interface';
import { SocketContext } from '../../helpers/context';
import { useParams } from 'react-router-dom';
import { ProfileBio } from './ProfileBio/ProfileBio';
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';
import { ProfileFriends } from './ProfileFriends/ProfileFriends';
import { ProfilePost } from './ProfilePost/ProfilePost';

interface IUserInfo {
  user: IUser;
}

export const Profile = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const { id } = useParams();
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    socket?.emit('userInfo:get', { userId: id });
    socket?.on('userInfo:user', ({ user }: IUserInfo) => {
      setUser(user);
    });

    return () => {
      socket?.off('userInfo:user');
    };
  }, [id, socket]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ProfileAvatar user={user} />
        <ProfileFriends />
      </div>
      <div className={styles.right}>
        <ProfileBio user={user} />
        <ProfilePost />
      </div>
    </div>
  );
};
