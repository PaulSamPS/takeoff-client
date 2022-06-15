import React from 'react';
import { socket } from '../helpers/socket';
import { useAppSelector } from './redux';

export const useFollow = (id?: string | undefined) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [friends, setFriends] = React.useState<any[]>([]);
  const [followings, setFollowings] = React.useState<any[]>([]);
  const [followers, setFollowers] = React.useState<any[]>([]);

  const handleFollow = () => {
    socket.emit('follow', { userId: id, userToFollowId: loginUser.id });
  };

  const handleUnfollow = () => {
    socket.emit('unfollow', { userId: id, userToUnfollowId: loginUser.id });
  };

  const handleAddFriend = (addFriendUserId: string) => {
    socket.emit('friends:add', { userId: addFriendUserId, userToFriendId: loginUser.id });
  };

  React.useEffect(() => {
    socket.emit('followings:get', {
      userId: id,
    });
    socket.on('followings:sent', ({ followingsUser, followersUser }) => {
      setFollowings(followingsUser);
      setFollowers(followersUser);
    });
    socket.on('followings:done', ({ followingsUser, followersUser }) => {
      setFollowings(followingsUser);
      setFollowers(followersUser);
    });
  }, [id]);

  React.useEffect(() => {
    socket.on('friends:sent', ({ userFriends }) => {
      setFriends(userFriends);
    });
  }, []);

  return { friends, followings, followers, handleFollow, handleUnfollow, handleAddFriend };
};
