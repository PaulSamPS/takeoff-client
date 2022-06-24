import React, { memo } from 'react';
import styles from './Sidebar.module.scss';
import { CustomLink } from '../../../components/CustomLink/CustomLink';
import { ReactComponent as MessagesIcon } from '../../../helpers/icons/chat.svg';
import { ReactComponent as MyProfileIcon } from '../../../helpers/icons/myProfile.svg';
import { ReactComponent as FriendsIcon } from '../../../helpers/icons/friends.svg';
import { ReactComponent as PeopleSearchIcon } from '../../../helpers/icons/searchPeople.svg';
import { SidebarProps } from './Sidebar.props';

export const Sidebar = memo(({ requests, chats }: SidebarProps) => {
  const totalUnreadMessages = chats
    .map((chat: any) => chat.countUnreadMessages)
    .reduce(function (sum: number, elem: number) {
      return sum + elem;
    }, 0);

  return (
    <div className={styles.wrapper}>
      <CustomLink to={'/main'}>
        <MyProfileIcon /> Новости
      </CustomLink>
      <CustomLink to={'conversations'}>
        <MessagesIcon /> Сообщения
        {totalUnreadMessages > 0 && (
          <div className={styles.unreadMessages}>{totalUnreadMessages}</div>
        )}
      </CustomLink>
      <CustomLink to={'friends'}>
        <FriendsIcon /> Друзья{' '}
        {requests.length > 0 && <div className={styles.requestFriends}>{requests.length}</div>}
      </CustomLink>
      <CustomLink to={'people'}>
        <PeopleSearchIcon /> Люди
      </CustomLink>
    </div>
  );
});
