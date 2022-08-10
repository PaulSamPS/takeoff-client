import { IPost } from '../redux/reducers/postsReducer';
import { IUser, IUserNotifications } from '../interfaces/user.interface';
import React from 'react';
import { SocketContext } from '../helpers/context';
import { useAppSelector } from './redux';

export interface INotification {
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
  const [notificationsCount, setNotificationsCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    socket?.emit('notification:get', { userId: loginUser.id });
    socket?.on('notifications', ({ notification }) => {
      setNotifications(notification);
    });
    socket?.on('notifications:count', ({ count }) => {
      setNotificationsCount(count);
    });
    setIsLoading(false);

    return () => {
      socket?.off('notifications');
      socket?.off('notifications:count');
    };
  }, [socket, window.location.pathname]);

  const handleReadNotifications = () => {
    socket?.emit('notifications:read', {
      userId: loginUser.id,
      readNotificationsCount: notificationsCount,
    });
    socket?.on('notifications:unread', ({ count }) => {
      setNotificationsCount(count);
    });
  };

  return { notifications, notificationsCount, handleReadNotifications, isLoading };
};
