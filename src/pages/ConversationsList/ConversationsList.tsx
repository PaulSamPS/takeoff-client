import React, { useContext } from 'react';
import styles from './ConversationList.module.scss';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';
import { useChat } from '../../hooks/useChat';
import { SocketContext } from '../../helpers/socketContext';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const ConversationsList = (): JSX.Element => {
  const socket = useContext(SocketContext);
  const [total, setTotal] = React.useState<number>(0);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const { chats } = useChat();
  const { screenWidth } = useScreenWidth();
  const { pathname } = useLocation();
  const { id } = useParams();

  React.useEffect(() => {
    const totalUnreadMessages = chats
      .map((chat) => chat.countUnreadMessages)
      .reduce((sum: number, elem: number) => {
        return sum + elem;
      }, 0);

    return () => {
      setTotal(totalUnreadMessages);
    };
  }, [socket, chats]);

  React.useEffect(() => {
    if (screenWidth < 1000 && pathname === `/main/conversations/${id}`) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenWidth, pathname, id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.borderTop} />
      <div className={styles.content}>
        <Outlet />
      </div>
      {!isMobile && (
        <div className={styles.rightBar}>
          <RightBar
            totalUnviewed={total}
            firstItem={'Все чаты'}
            secondItem={'Непрочитанные'}
            firstItemLink={'/main/conversations'}
            secondItemLink={'/main/conversations/unread'}
            isFixed={true}
          />
        </div>
      )}
    </div>
  );
};
