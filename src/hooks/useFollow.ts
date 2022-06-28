import React from 'react';
import { socket } from '../helpers/socket';
import { useAppSelector } from './redux';

interface IUser {
  id: string | undefined;
  name: string;
  email: string;
  position: string;
  level: string;
  role: string;
  avatar: string;
}

interface IFollow {
  followingsUser: IUser[];
  followersUser: IUser[];
}

interface IFollowReturn {
  followings: IUser[];
  followers: IUser[];
  handleFollow: () => void;
  handleUnfollow: () => void;
}

export const useFollow = (id?: string | undefined): IFollowReturn => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [followings, setFollowings] = React.useState<IUser[]>([]);
  const [followers, setFollowers] = React.useState<IUser[]>([]);

  const handleFollow = () => {
    socket.emit('follow', { userId: id, userToFollowId: loginUser.id });
  };

  const handleUnfollow = () => {
    socket.emit('unfollow', { userId: id, userToUnfollowId: loginUser.id });
  };

  React.useEffect(() => {
    socket.emit('followings:get', {
      userId: id,
    });
    socket.on('followings:sent', ({ followingsUser, followersUser }: IFollow) => {
      setFollowings(followingsUser);
      setFollowers(followersUser);
    });
    socket.on('followings:done', ({ followingsUser, followersUser }: IFollow) => {
      setFollowings(followingsUser);
      setFollowers(followersUser);
    });

    return () => {
      socket.off('followings:sent');
      socket.off('followings:done');
    };
  }, [id]);

  return { followings, followers, handleFollow, handleUnfollow };
};
