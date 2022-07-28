import { IPost } from '../redux/reducers/postsReducer';
import { IUser, IUserNotifications } from '../interfaces/user.interface';
import React from 'react';
import { SocketContext } from '../helpers/context';
import { useAppSelector } from './redux';

interface INotification {
  _id: string;
  type: 'newLike' | 'newComment' | 'newFollower';
  user: IUserNotifications;
  post: IPost;
  commentId: string;
  text: string;
  date: Date;
}

export interface INotifications {
  _id: string;
  user: IUser;
  notifications: INotification[];
}

export const useNotifications = () => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [notifications, setNotifications] = React.useState<INotifications>({
    _id: '',
    user: {} as IUser,
    notifications: [],
  });

  React.useEffect(() => {
    socket?.emit('notification:get', { userId: loginUser.id });
    socket?.on('notifications', ({ notification }) => {
      setNotifications(notification);
    });

    return () => {
      socket?.off('notifications');
    };
  }, [socket]);

  return { notifications };
};
