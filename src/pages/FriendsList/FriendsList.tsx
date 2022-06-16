import React from 'react';
import styles from './Friendslist.module.scss';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { Outlet } from 'react-router-dom';
import { socket } from '../../helpers/socket';
import { useAppSelector } from '../../hooks/redux';

export const FriendsList = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [request, setRequest] = React.useState<any[]>([]);

  React.useEffect(() => {
    socket.emit('friendsRequest:get', {
      userId: user.id,
    });
    socket.on('friendsRequest:sent', ({ followersUser }) => {
      setRequest(followersUser);
    });
    socket.on('followings:done', ({ followingsUser }) => {
      setRequest(followingsUser);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <CustomLink to='' className={styles.name}>
          Друзья
        </CustomLink>
        <CustomLink to='requests' className={styles.name}>
          Заявки в друзья <div>{request.length}</div>
        </CustomLink>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};
