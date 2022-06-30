import React from 'react';
import styles from './Sidebar.module.scss';
import { CustomLink } from '../../../components/CustomLink/CustomLink';
import { ReactComponent as MessagesIcon } from '../../../helpers/icons/chat.svg';
import { ReactComponent as NewsIcon } from '../../../helpers/icons/news.svg';
import { ReactComponent as FriendsIcon } from '../../../helpers/icons/friends.svg';
import { ReactComponent as PeopleSearchIcon } from '../../../helpers/icons/searchPeople.svg';
import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';
import { useChat } from '../../../hooks/useChat';
import { Count } from '../../../components/Count/Count';

export const Sidebar = ({ requests, className }: SidebarProps) => {
  const { chats } = useChat();
  const totalUnreadMessages = chats.reduce((sum: number, elem: any) => {
    return sum + elem.countUnreadMessages;
  }, 0);

  return (
    <div className={cn(styles.wrapper, className)}>
      <CustomLink to={'/main'}>
        <NewsIcon /> Новости
      </CustomLink>
      <CustomLink to={'conversations'}>
        <MessagesIcon /> Сообщения
        {totalUnreadMessages > 0 && <Count>{totalUnreadMessages}</Count>}
      </CustomLink>
      <CustomLink to={'friends'}>
        <FriendsIcon /> Друзья {requests.length > 0 && <Count>{requests.length}</Count>}
      </CustomLink>
      <CustomLink to={'people'}>
        <PeopleSearchIcon /> Люди
      </CustomLink>
    </div>
  );
};
