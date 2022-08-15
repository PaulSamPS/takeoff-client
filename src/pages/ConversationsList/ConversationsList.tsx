import React, { useContext } from 'react';
import styles from './ConversationList.module.scss';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';
import { useChat } from '../../hooks/useChat';
import { SocketContext } from '../../helpers/socketContext';

export const ConversationsList = (): JSX.Element => {
  const socket = useContext(SocketContext);
  const [total, setTotal] = React.useState<number>(0);
  const { chats } = useChat();

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
