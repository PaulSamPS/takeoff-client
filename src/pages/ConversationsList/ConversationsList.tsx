import React, { useContext } from 'react';
import styles from './ConversationList.module.scss';
import { useNavigate } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';
import { useChat } from '../../hooks/useChat';
import { SocketContext } from '../../helpers/context';
import { Conversations } from '../Conversations/Conversations';
import { ConversationsUnread } from '../ConversationsUnread/ConversationsUnread';
import { Messages } from '../Messages/Messages';

export const ConversationsList = () => {
  const socket = useContext(SocketContext);
  const { chats } = useChat();
  const [total, setTotal] = React.useState<number>(0);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const allConversations = queryParams.get('all');
  const unreadConversations = queryParams.get('unread');
  const chatWith = queryParams.get('with');

  React.useEffect(() => {
    if (location.pathname === '/conversations') {
      navigate({ search: '?all=messages' });
    }
  }, []);

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
      {allConversations && <Conversations />}
      {unreadConversations && <ConversationsUnread />}
      {chatWith && <Messages />}
      <RightBar
        totalUnviewed={total}
        queryFirst={allConversations}
        querySecond={unreadConversations}
        firstItem={'Все чаты'}
        secondItem={'Непрочитанные'}
        firstItemLink={'?all=messages'}
        secondItemLink={'?unread=messages'}
        isFixed={true}
      />
    </div>
  );
};
