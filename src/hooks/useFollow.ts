import React, { useRef } from 'react';
import { useAppSelector } from './redux';
import { io, Socket } from 'socket.io-client';
import { API_URL_WS } from '../http/axios';

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
  const socketRef = useRef<Socket>();

  React.useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_URL_WS, { transports: ['websocket'] });
    }
  }, []);

  const handleFollow = () => {
    socketRef.current?.emit('follow', { userId: id, userToFollowId: loginUser.id });
  };

  const handleUnfollow = () => {
    socketRef.current?.emit('unfollow', { userId: id, userToUnfollowId: loginUser.id });
  };

  React.useEffect(() => {
    socketRef.current?.emit('followings:get', {
      userId: id,
    });
    socketRef.current?.on('followings:sent', ({ followingsUser, followersUser }: IFollow) => {
      setFollowings(followingsUser);
      setFollowers(followersUser);
    });
    socketRef.current?.on('followings:done', ({ followingsUser, followersUser }: IFollow) => {
      setFollowings(followingsUser);
      setFollowers(followersUser);
    });
  }, [id, followings]);

  return { followings, followers, handleFollow, handleUnfollow };
};
