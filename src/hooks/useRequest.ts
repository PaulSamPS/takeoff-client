import { useAppSelector } from './redux';
import React from 'react';
import { socket } from '../helpers/socket';

export const useRequest = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [request, setRequest] = React.useState<any[]>([]);
  const [friends, setFriends] = React.useState<any[]>([]);

  const addFriend = (addFriendUserId: string) => {
    socket.emit('friends:add', { userId: user.id, userToFriendId: addFriendUserId });
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
    });
  }, []);

  return { addFriend, request, friends };
};
