import React from 'react';
import styles from '../Conversations/Conversations.module.scss';
import { Search } from '../../../components/UI/Search/Search';
import { MessagesCard } from '../../../components/MessagesCard/MessagesCard';
import { useAppSelector } from '../../../hooks/redux';
import { useChat } from '../../../hooks/useChat';
import { Spinner } from '../../../components/UI/Spinner/Spinner';

export const ConversationsUnread = () => {
  const { isLoading } = useAppSelector((state) => state.conversationReducer);
  const [search, setSearch] = React.useState<string | null>('');
  const { chats } = useChat();
  console.log(search);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        display:
          chats.filter((chat) => chat.countUnreadMessages).length <= 0 ? 'grid' : 'block',
        height:
          chats.filter((chat) => chat.countUnreadMessages).length > 0
            ? 'fit-content'
            : 'calc(100vh - 160px)',
      }}
    >
      <Search setText={setSearch} className={styles.search} placeholder={'Поиск'} />
      {chats.map(
        (chat) =>
          chat.countUnreadMessages > 0 && (
            <MessagesCard key={chat.messagesWith} chat={chat} className={styles.card} />
          )
      )}
      {chats.filter((chat) => chat.countUnreadMessages).length <= 0 && (
        <span className={styles.noMessages}>Нет сообщений</span>
      )}
    </div>
  );
};
