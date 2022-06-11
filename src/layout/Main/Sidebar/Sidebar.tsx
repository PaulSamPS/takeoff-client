import React from 'react';
import styles from './Sidebar.module.scss';
import { CustomLink } from '../../../components/CustomLink/CustomLink';
import { ReactComponent as MessagesIcon } from '../../../helpers/icons/chat.svg';
import { ReactComponent as HomeIcon } from '../../../helpers/icons/home.svg';
import { ReactComponent as FriendsIcon } from '../../../helpers/icons/friends.svg';
import { ReactComponent as PeopleSearchIcon } from '../../../helpers/icons/searchPeople.svg';
import { useAppSelector } from '../../../hooks/redux';

export const Sidebar = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
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
        <FriendsIcon /> Друзья
      </CustomLink>
      <CustomLink to={'people'}>
        <PeopleSearchIcon /> Люди
      </CustomLink>
    </div>
  );
};
