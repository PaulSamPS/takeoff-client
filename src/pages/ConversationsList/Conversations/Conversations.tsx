import React, { FormEvent } from 'react';
import { useChat } from '../../../hooks/useChat';
import styles from './Conversations.module.scss';
import { Search, Spinner } from '../../../components/UI';
import { MessagesCard } from '../../../components/MessagesCard/MessagesCard';

export const Conversations = (): JSX.Element => {
  const [search, setSearch] = React.useState<string>('');

  const { chats, loadingChats } = useChat();

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search?.toLowerCase())
  );

  const handleSearch = React.useCallback((e: FormEvent<HTMLDivElement>) => {
    setSearch(e.currentTarget.textContent!.toString());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Search onInput={handleSearch} className={styles.search} placeholder={'Поиск'} />
      {loadingChats ? (
        <Spinner />
      ) : (
        <>
          {filteredChats.length > 0 &&
            filteredChats.map((chat) => (
              <MessagesCard key={chat.messagesWith} chat={chat} className={styles.card} />
            ))}
          {filteredChats.length <= 0 && <span className={styles.noMessages}>Нет сообщений</span>}
        </>
      )}
    </div>
  );
};
