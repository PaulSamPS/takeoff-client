import React from 'react';
import styles from './Sidebar.module.scss';
import { CustomLink } from '../../../components/CustomLink/CustomLink';
import { ReactComponent as MessagesIcon } from '../../../helpers/icons/chat.svg';
import { ReactComponent as HomeIcon } from '../../../helpers/icons/home.svg';
import { ReactComponent as FriendsIcon } from '../../../helpers/icons/friends.svg';
import { ReactComponent as PeopleSearchIcon } from '../../../helpers/icons/searchPeople.svg';
import { useAppSelector } from '../../../hooks/redux';
import { socket } from '../../../helpers/socket';

export const Sidebar = () => {
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
      <CustomLink to={'/main'}>
        <HomeIcon /> Главная
      </CustomLink>
      <CustomLink to={'conversations'}>
        <MessagesIcon /> Сообщения
        {user.countUnreadMessages > 0 && (
          <div className={styles.unreadMessages}>{user.countUnreadMessages}</div>
        )}
      </CustomLink>
      <CustomLink to={'friends'}>
        <FriendsIcon /> Друзья <div className={styles.requestFriends}>{request.length}</div>
      </CustomLink>
      <CustomLink to='requests' className={styles.name}>
        Заявки в друзья <div>{request.length}</div>
      </CustomLink>
      <CustomLink to={'people'}>
        <PeopleSearchIcon /> Люди
      </CustomLink>
    </div>
  );
};
