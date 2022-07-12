import React from 'react';
import { useAppSelector } from './redux';
import { SocketContext } from '../helpers/context';

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

export const useFollow = (): IFollowReturn => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [followings, setFollowings] = React.useState<IUser[]>([]);
  const [followers, setFollowers] = React.useState<IUser[]>([]);
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('user');

  const handleFollow = () => {
    socket?.emit('follow', { userId: userId, userToFollowId: loginUser.id });
  };

  const handleUnfollow = () => {
    socket?.emit('unfollow', { userId: userId, userToUnfollowId: loginUser.id });
  };

  React.useEffect(() => {
    socket?.emit('followings:get', {
      userId: userId,
    });
    socket?.on('followings:sent', ({ followingsUser, followersUser }: IFollow) => {
      setFollowings(followingsUser);
      setFollowers(followersUser);
    });
    socket?.on('followings:done', ({ followingsUser, followersUser }: IFollow) => {
      setFollowings(followingsUser);
      setFollowers(followersUser);
    });

    return () => {
      socket?.off('followings:sent');
      socket?.off('followings:done');
    };
  }, [socket]);

  return { followings, followers, handleFollow, handleUnfollow };
};
