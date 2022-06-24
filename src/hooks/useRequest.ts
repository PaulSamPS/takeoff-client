import { useAppSelector } from './redux';
import React, { useRef } from 'react';
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

interface IRequest {
  followingsUser: IUser[];
}

interface IFriends {
  friendsUser: IUser[];
}

interface IReturn {
  request: IUser[];
  friends: IUser[];
  loadingFriends: boolean;
  friendsUserInfo: IUser[];
  addFriend: (id: string | undefined) => void;
  rejectFriend: (id: string | undefined) => void;
}

export const useRequest = (): IReturn => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [request, setRequest] = React.useState<IUser[]>([]);
  const [friends, setFriends] = React.useState<IUser[]>([]);
  const [loadingFriends, setLoadingFriends] = React.useState<boolean>(true);
  const [friendsUserInfo, setFriendsUserInfo] = React.useState<IUser[]>([]);
  const id = localStorage.getItem('userInfoId');
  const socketRef = useRef<Socket>();

  React.useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_URL_WS, { transports: ['websocket'] });
    }
  }, []);

  const addFriend = (addFriendUserId: string | undefined) => {
    socketRef.current?.emit('friends:add', { userId: user.id, userToFriendId: addFriendUserId });
  };

  const rejectFriend = (rejectFriendUserId: string | undefined) => {
    socketRef.current?.emit('friends:reject', {
      userId: user.id,
      userToRejectId: rejectFriendUserId,
    });
  };

  React.useEffect(() => {
    socketRef.current?.emit('friendsRequest:get', {
      userId: user.id,
    });
    socketRef.current?.on('friendsRequest:sent', ({ followingsUser }: IRequest) => {
      setRequest(followingsUser);
    });
  }, [request]);

  React.useEffect(() => {
    socketRef.current?.emit('friends:get', { userId: user.id });
    socketRef.current?.on('friends:set', ({ friendsUser }: IFriends) => {
      setFriends(friendsUser);
      setLoadingFriends(false);
    });
    socketRef.current?.emit('friendsUserInfo:get', { userId: id });
    socketRef.current?.on('friendsUserInfo:set', ({ friendsUser }: IFriends) => {
      setFriendsUserInfo(friendsUser);
    });
  }, [friends]);

  return { addFriend, rejectFriend, request, friends, loadingFriends, friendsUserInfo };
};
