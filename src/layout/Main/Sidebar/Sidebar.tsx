import React from 'react';
import { ReactComponent as MessagesIcon } from '../../../helpers/icons/chat.svg';
import { ReactComponent as NewsIcon } from '../../../helpers/icons/news.svg';
import { ReactComponent as FriendsIcon } from '../../../helpers/icons/friends.svg';
import { ReactComponent as MyProfileIcon } from '../../../helpers/icons/profile.svg';
import { CustomLink, Count } from '../../../components/UI';
import { SidebarProps } from './Sidebar.props';
import { SocketContext } from '../../../helpers/socketContext';
import { useChat } from '../../../hooks/useChat';
import { useRequest } from '../../../hooks/useRequest';
import { useAppSelector } from '../../../hooks/redux';

import cn from 'classnames';

import styles from './Sidebar.module.scss';

export const Sidebar = ({ className }: SidebarProps) => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [total, setTotal] = React.useState<number>(0);

  const { chats } = useChat();
  const { request } = useRequest();

  React.useEffect(() => {
    const totalUnreadMessages = chats
      .map((chat) => chat.countUnreadMessages)
      .reduce((sum: number, elem: number) => {
        return sum + elem;
      }, 0);
    setTotal(totalUnreadMessages);
  }, [socket, chats]);

  const handleSetId = () => {
    localStorage.setItem('followId', loginUser.id);
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <CustomLink
        to={`/main/profile/${loginUser.id}`}
        style={{ padding: '0' }}
        onClick={handleSetId}
      >
        <MyProfileIcon /> Моя страница
      </CustomLink>
      <CustomLink to={'/main/news'} style={{ padding: '0' }}>
        <NewsIcon /> Новости
      </CustomLink>
      <CustomLink to={'/main/conversations'} style={{ padding: '0' }}>
        <MessagesIcon /> Сообщения
        {total > 0 && <Count>{total}</Count>}
      </CustomLink>
      <CustomLink to={'/main/friends'} style={{ padding: '0' }}>
        <FriendsIcon /> Друзья {request && request.length > 0 && <Count>{request.length}</Count>}
      </CustomLink>
    </div>
  );
};
