import React from 'react';
import { useChat } from '../../hooks/useChat';
import styles from './Conversations.module.scss';
import { Search } from '../../components/Search/Search';
import { useAppSelector } from '../../hooks/redux';
import { Spinner } from '../../components/Spinner/Spinner';
import { MessagesCard } from '../../components/MessagesCard/MessagesCard';

export const Conversations = () => {
  const { isLoading } = useAppSelector((state) => state.conversationReducer);
  const [search, setSearch] = React.useState<string>('');
  const { chats } = useChat();

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <>
      <div className={styles.borderTop} />
      <div className={styles.borderTopSidebar} />
      <div
        className={styles.wrapper}
        style={{
          display: filteredChats.length <= 0 ? 'grid' : 'block',
          height: filteredChats.length > 0 ? 'fit-content' : 'calc(100vh - 160px)',
        }}
      >
        {!isLoading ? (
          <>
            <Search setText={setSearch} className={styles.search} placeholder={'Поиск'} />
            {filteredChats.map((chat) => (
              <MessagesCard key={chat.messagesWith} chat={chat} className={styles.card} />
            ))}
            {filteredChats.length <= 0 && <span className={styles.noMessages}>Нет сообщений</span>}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
