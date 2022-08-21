import React, { FormEvent } from 'react';
import styles from '../Conversations/Conversations.module.scss';
import { Search, Spinner } from '../../../components/UI';
import { MessagesCard } from '../../../components/MessagesCard/MessagesCard';
import { useChat } from '../../../hooks/useChat';

export const Unread = (): JSX.Element => {
  const [search, setSearch] = React.useState<string>('');
  const { chats, loadingChats } = useChat();

  const handleSearch = (e: FormEvent<HTMLDivElement>) => {
    setSearch(e.currentTarget.textContent!.toString());
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <Search onInput={handleSearch} className={styles.search} placeholder={'Поиск'} />
      {loadingChats ? (
        <Spinner />
      ) : (
        <>
          {filteredChats.map(
            (chat) =>
              chat.countUnreadMessages > 0 && (
                <MessagesCard key={chat.messagesWith} chat={chat} className={styles.card} />
              )
          )}
          {filteredChats.filter((chat) => chat.countUnreadMessages).length <= 0 && (
            <span className={styles.noMessages}>Нет сообщений</span>
          )}
        </>
      )}
    </div>
  );
};
