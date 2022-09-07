import { useAppDispatch, useAppSelector } from './redux';
import React from 'react';
import { SocketContext } from '../helpers/socketContext';
import { useParams } from 'react-router-dom';
import { IUser } from '../interfaces/user.interface';
import { IRequest, IReturnRequest } from '../interfaces/useRequest.interface';
import { setFriendsUserInfoReducer } from '../redux/reducers/friendsUserInfoReducer';

export const useRequest = (): IReturnRequest => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const dispatch = useAppDispatch();

  const [request, setRequest] = React.useState<IUser[]>([]);
  const [friends, setFriends] = React.useState<IUser[]>([]);
  const [friendsUserInfo, setFriendsUserInfo] = React.useState<IUser[]>([]);
  const [loadingFriends, setLoadingFriends] = React.useState<boolean>(true);

  console.log(friendsUserInfo);

  const friendId = localStorage.getItem('friendsUserInfo');
  const { id } = useParams();

  const addFriend = (addFriendUserId: string | undefined) => {
    socket?.emit('friends:add', { userId: loginUser.id, userToFriendId: addFriendUserId });
    socket?.on('followers:addSuccess', () => {
      socket?.emit('friendsUserInfo:get', { userId: id ? id : friendId });
      socket?.emit('friends:get', { userId: loginUser.id });
    });
  };

  const rejectFriend = (rejectFriendUserId: string | undefined) => {
    socket?.emit('friends:reject', { userId: loginUser.id, userToRejectId: rejectFriendUserId });
    socket?.on('friends:rejectSuccess', () => {
      socket?.emit('friendsRequest:get', {
        userId: loginUser.id,
      });
    });
  };

  const deleteFromFriend = (deleteUserId: string | undefined) => {
    socket?.emit('friends:delete', { userId: loginUser.id, deleteUserId: deleteUserId });
    socket?.on('friends:deleteSuccess', () => {
      socket?.emit('friendsUserInfo:get', { userId: id ? id : friendId });
      socket?.emit('friends:get', { userId: loginUser.id });
    });
  };

  React.useEffect(() => {
    socket?.emit('friendsRequest:get', {
      userId: loginUser.id,
    });
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
    socket?.emit('friends:get', { userId: loginUser.id });
    socket?.on('friends:set', ({ friendsUser }: { friendsUser: IUser[] }) => {
      setFriends(friendsUser);
    });

    return () => {
      socket?.off('friends:set');
    };
  }, [socket, loginUser.id]);

  React.useEffect(() => {
    socket?.emit('friendsUserInfo:get', { userId: id ? id : friendId });
    socket?.on('friendsUserInfo:set', ({ friendsUser }: { friendsUser: IUser[] }) => {
      setFriendsUserInfo(friendsUser);
      dispatch(setFriendsUserInfoReducer(friendsUser));
      setLoadingFriends(false);
    });

    return () => {
      socket?.off('friendsUserInfo:set');
    };
  }, [socket, id, friendId]);

  return {
    addFriend,
    rejectFriend,
    request,
    friends,
    loadingFriends,
    friendsUserInfo,
    deleteFromFriend,
  };
};
