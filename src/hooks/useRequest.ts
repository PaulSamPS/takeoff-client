import { useAppSelector } from './redux';
import React from 'react';
import { SocketContext } from '../helpers/context';
import { useParams } from 'react-router-dom';

interface IUser {
  id: string | undefined;
  name: string;
  email: string;
  position: string;
  level: string;
  role: string;
  avatar: string;
  lastVisit: Date;
  isOnline: boolean;
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
  const socket = React.useContext(SocketContext);
  const { user } = useAppSelector((state) => state.loginReducer);
  const [request, setRequest] = React.useState<IUser[]>([]);
  const [friends, setFriends] = React.useState<IUser[]>([]);
  const [loadingFriends, setLoadingFriends] = React.useState<boolean>(true);
  const [friendsUserInfo, setFriendsUserInfo] = React.useState<IUser[]>([]);
  const { id } = useParams();

  const addFriend = (addFriendUserId: string | undefined) => {
    socket?.emit('friends:add', { userId: user.id, userToFriendId: addFriendUserId });
  };

  const rejectFriend = (rejectFriendUserId: string | undefined) => {
    socket?.emit('friends:reject', { userId: user.id, userToRejectId: rejectFriendUserId });
    setTimeout(() => {
      socket?.emit('friendsRequest:get', {
        userId: user.id,
      });
    }, 500);
  };

  React.useEffect(() => {
    socket?.emit('friendsRequest:get', {
      userId: user.id,
    });
    console.log('reject');
    socket?.on('friendsRequest:sent', ({ followingsUser }: IRequest) => {
      setRequest(followingsUser);
    });
    socket?.on('followings:done', ({ followingsUser }) => {
      setRequest(followingsUser);
    });

    return () => {
      socket?.off('friendsRequest:sent');
      socket?.off('followings:done');
    };
  }, [socket, window.location.pathname]);

  React.useEffect(() => {
    socket?.emit('friends:get', { userId: user.id });
    socket?.on('friends:set', ({ friendsUser }: IFriends) => {
      setFriends(friendsUser);
      setLoadingFriends(false);
    });
    socket?.emit('friendsUserInfo:get', { userId: id });
    socket?.on('friendsUserInfo:set', ({ friendsUser }: IFriends) => {
      setFriendsUserInfo(friendsUser);
    });
    return () => {
      socket?.off('friends:set');
      socket?.off('friendsUserInfo:set');
    };
  }, [socket, id]);

  return { addFriend, rejectFriend, request, friends, loadingFriends, friendsUserInfo };
};
