import React from 'react';
import styles from './Sidebar.module.scss';
import { CustomLink } from '../../../components/CustomLink/CustomLink';
import { ReactComponent as MessagesIcon } from '../../../helpers/icons/chat.svg';
import { ReactComponent as NewsIcon } from '../../../helpers/icons/news.svg';
import { ReactComponent as FriendsIcon } from '../../../helpers/icons/friends.svg';
import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';
import { Count } from '../../../components/Count/Count';
import { SocketContext } from '../../../helpers/context';
import { useChat } from '../../../hooks/useChat';
import { useRequest } from '../../../hooks/useRequest';

export const Sidebar = ({ className }: SidebarProps) => {
  const socket = React.useContext(SocketContext);
  const [total, setTotal] = React.useState<number>(0);
  const { chats } = useChat();
  const { request } = useRequest();

  React.useEffect(() => {
    const totalUnreadMessages = chats
      .map((chat: any) => chat.countUnreadMessages)
      .reduce((sum: number, elem: any) => {
        return sum + elem;
      }, 0);
    setTotal(totalUnreadMessages);
  }, [socket, chats]);

  return (
    <div className={cn(styles.wrapper, className)}>
      <CustomLink to={'/?posts=all'}>
        <NewsIcon /> Новости
      </CustomLink>
      <CustomLink to={'/conversations?all=messages'}>
        <MessagesIcon /> Сообщения
        {total > 0 && <Count>{total}</Count>}
      </CustomLink>
      <CustomLink to={'/friends?all=get'}>
        <FriendsIcon /> Друзья {request && request.length > 0 && <Count>{request.length}</Count>}
      </CustomLink>
    </div>
  );
};
