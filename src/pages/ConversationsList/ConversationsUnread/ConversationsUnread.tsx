import React, { FormEvent } from 'react';
import styles from '../Conversations/Conversations.module.scss';
import { Search } from '../../../components/UI/Search/Search';
import { MessagesCard } from '../../../components/MessagesCard/MessagesCard';
import { useChat } from '../../../hooks/useChat';

export const Unread = (): JSX.Element => {
  const [search, setSearch] = React.useState<string | null>('');
  const { chats } = useChat();
  console.log(search);

  const handleSearch = (e: FormEvent<HTMLDivElement>) => {
    setSearch(e.currentTarget.textContent!.toString());
  };

  return (
    <div className={styles.wrapper}>
      <Search onInput={handleSearch} className={styles.search} placeholder={'Поиск'} />
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
