import React from 'react';
import styles from '../Conversations/Conversations.module.scss';
import { Search } from '../../../components/UI/Search/Search';
import { MessagesCard } from '../../../components/MessagesCard/MessagesCard';
import { useChat } from '../../../hooks/useChat';

export const ConversationsUnread = (): JSX.Element => {
  const [search, setSearch] = React.useState<string | null>('');
  const { chats } = useChat();
  console.log(search);

  return (
    <div className={styles.wrapper}>
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
