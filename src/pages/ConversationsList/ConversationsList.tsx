import React, { useContext } from 'react';
import styles from './ConversationList.module.scss';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';
import { useChat } from '../../hooks/useChat';
import { SocketContext } from '../../helpers/context';

export const ConversationsList = () => {
  const socket = useContext(SocketContext);
  const { chats } = useChat();
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    const totalUnreadMessages = chats
      .map((chat: any) => chat.countUnreadMessages)
      .reduce((sum: number, elem: any) => {
        return sum + elem;
      }, 0);
    setTotal(totalUnreadMessages);
  }, [socket, chats]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.borderTop} />
      <Outlet />
      <RightBar
        totalUnviewed={total}
        firstItem={'Все чаты'}
        secondItem={'Непрочитанные'}
        firstItemLink={'/main/conversations'}
        secondItemLink={'/main/conversations/unread'}
        isFixed={true}
      />
    </div>
  );
};
