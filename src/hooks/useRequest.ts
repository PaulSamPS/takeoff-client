import { useAppSelector } from './redux';
import React from 'react';
import { socket } from '../helpers/socket';

export const useRequest = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [request, setRequest] = React.useState<any[]>([]);
  const [friends, setFriends] = React.useState<any[]>([]);
  const [loadingFriends, setLoadingFriends] = React.useState<boolean>(true);

  const addFriend = (addFriendUserId: string | undefined) => {
    socket.emit('friends:add', { userId: user.id, userToFriendId: addFriendUserId });
  };

  const rejectFriend = (rejectFriendUserId: string) => {
    socket.emit('friends:reject', { userId: user.id, userToRejectId: rejectFriendUserId });
  };

  React.useEffect(() => {
    socket.emit('friendsRequest:get', {
      userId: user.id,
    });
    socket.on('friendsRequest:sent', ({ followingsUser }) => {
      setRequest(followingsUser);
    });
  }, [request]);

  React.useEffect(() => {
    socket.emit('friends:get', { userId: user.id });
    socket.on('friends:set', ({ friendsUser }) => {
      setFriends(friendsUser);
      setLoadingFriends(false);
    });
  }, []);

  return { addFriend, rejectFriend, request, friends, loadingFriends };
};
