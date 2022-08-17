import { IUser } from '../interfaces/user.interface';
import React from 'react';
import { SocketContext } from '../helpers/socketContext';
import { useAppSelector } from './redux';
import { INotifications, INotificationsReturn } from '../interfaces/useNotifications.interface';

const initialStateNotifications = {
  _id: '',
  user: {} as IUser,
  notifications: [],
};

export const useNotifications = (): INotificationsReturn => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [notifications, setNotifications] =
    React.useState<INotifications>(initialStateNotifications);
  const [notificationsCount, setNotificationsCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  console.log(notifications);

  React.useEffect(() => {
    setIsLoading(true);
    socket?.emit('notification:get', { userId: loginUser.id });
    socket?.on('notifications', ({ _id, user, notifications }: INotifications) => {
      setNotifications({ _id: _id, user: user, notifications: notifications });
    });
    setIsLoading(false);

    return () => {
      socket?.off('notifications');
    };
  }, [socket]);

  React.useEffect(() => {
    socket?.emit('notifications:countGet', { userId: loginUser.id });
    socket?.on('notifications:countSuccess', ({ count }: { count: number }) => {
      setNotificationsCount(count);
    });

    return () => {
      socket?.off('notifications:countSuccess');
    };
  }, [socket]);

  const handleReadNotifications = () => {
    socket?.emit('notifications:read', {
      userId: loginUser.id,
      readNotificationsCount: notificationsCount,
    });
    socket?.on('notifications:unread', ({ count }: { count: number }) => {
      setNotificationsCount(count);
    });
  };

  return { notifications, notificationsCount, handleReadNotifications, isLoading };
};
