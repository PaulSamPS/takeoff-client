import React from 'react';
import styles from './Profile.module.scss';
import { IUser } from '../../interfaces/user.interface';
import { SocketContext } from '../../helpers/socketContext';
import { useParams } from 'react-router-dom';
import { ProfileBio } from './ProfileBio/ProfileBio';
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';
import { ProfileFriends } from './ProfileFriends/ProfileFriends';
import { ProfilePost } from './ProfilePost/ProfilePost';

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
