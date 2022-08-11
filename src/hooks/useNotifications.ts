import { IUser} from '../interfaces/user.interface';
import React from 'react';
import { SocketContext } from '../helpers/context';
import { useAppSelector } from './redux';
import {INotifications, INotificationsReturn} from '../interfaces/useNotifications.interface';

const initialStateNotifications = {
  _id: '',
  user: {} as IUser,
  notifications: [],
};

export const useNotifications = (): INotificationsReturn => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [notifications, setNotifications] = React.useState<INotifications>(initialStateNotifications);
  const [notificationsCount, setNotificationsCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    socket?.emit('notification:get', { userId: loginUser.id });
    socket?.on('notifications', ({ notification }: { notification: INotifications }) => {
      setNotifications(notification);
    });
    socket?.on('notifications:count', ({ count }: {count: number}) => {
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
    socket?.on('notifications:unread', ({ count }: {count: number}) => {
      setNotificationsCount(count);
    });
  };

  return { notifications, notificationsCount, handleReadNotifications, isLoading };
};
