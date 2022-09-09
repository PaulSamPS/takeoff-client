import React from 'react';
import { MobileMenuType } from './MobileMenu.type';
import { useAppSelector } from '../../../hooks/redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../../helpers/icons/profile.svg';
import { ReactComponent as NewsIcon } from '../../../helpers/icons/news.svg';
import { ReactComponent as ChatIcon } from '../../../helpers/icons/chat.svg';
import { ReactComponent as FriendsIcon } from '../../../helpers/icons/friends.svg';

import styles from './MobileMenu.module.scss';
import { useChat } from '../../../hooks/useChat';
import { Count } from '../../../components/UI';
import { SocketContext } from '../../../helpers/socketContext';
import { useRequest } from '../../../hooks/useRequest';

export const MobileMenu = ({ className, ...props }: MobileMenuType): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const socket = React.useContext(SocketContext);

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

  return (
    <div className={styles.wrapper}>
      <Link to={`/main/profile/${loginUser.id}`}>
        <ProfileIcon />
      </Link>
      <Link to={'/main/news'}>
        <NewsIcon />
      </Link>
      <Link to={'/main/conversations'} className={styles.chat}>
        <ChatIcon />
        {total > 0 && <Count className={styles.count}>{total}</Count>}
      </Link>
      <Link to={'/main/friends'} className={styles.friends}>
        <FriendsIcon />{' '}
        {request && request.length > 0 && <Count className={styles.count}>{request.length}</Count>}
      </Link>
    </div>
  );
};
