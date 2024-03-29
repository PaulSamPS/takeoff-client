import React from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { SocketContext } from '../helpers/socketContext';
import { useParams } from 'react-router-dom';
import { IUser } from '../interfaces/user.interface';
import { IFollow, IFollowReturn } from '../interfaces/useFollow.interface';
import { setFollowersUser } from '../redux/reducers/followersUserReducer';

export const useFollow = (): IFollowReturn => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const dispatch = useAppDispatch();

  const [followings, setFollowings] = React.useState<IUser[]>([]);
  const [followers, setFollowers] = React.useState<IUser[]>([]);

  const { id } = useParams();

  const followId = localStorage.getItem('followId');

  const handleFollow = React.useCallback(() => {
    socket?.emit('follow', {
      userId: id !== undefined && id !== loginUser.id ? id : followId,
      userToFollowId: loginUser.id,
    });
    setTimeout(() => {
      socket?.emit('followings:get', {
        userId: id !== undefined && id !== loginUser.id ? id : followId,
      });
    }, 500);
  }, []);

  const handleUnfollow = React.useCallback(() => {
    socket?.emit('unfollow', {
      userId: id !== undefined && id !== loginUser.id ? id : followId,
      userToUnfollowId: loginUser.id,
    });
  }, []);

  React.useEffect(() => {
    socket?.emit('followings:get', {
      userId: id !== undefined && id !== loginUser.id ? id : followId,
    });
    socket?.on('followings:sent', ({ followingsUser, followersUser }: IFollow) => {
      dispatch(setFollowersUser(followingsUser));
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
  }, [socket, id, followId]);

  return { followings, followers, handleFollow, handleUnfollow };
};
