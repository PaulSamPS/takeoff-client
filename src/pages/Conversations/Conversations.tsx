import React from 'react';
import { useChat } from '../../hooks/useChat';
import styles from './Conversations.module.scss';
import { Search } from '../../components/Search/Search';
import { useAppSelector } from '../../hooks/redux';
import { Spinner } from '../../components/Spinner/Spinner';
import { MessagesCard } from '../../components/MessagesCard/MessagesCard';

interface IChats {
  avatar: string | null;
  date: Date;
  lastMessage: string;
  messagesWith: string;
  name: string;
  countUnreadMessages: number;
}

export const Conversations = () => {
  const { isLoading } = useAppSelector((state) => state.conversationReducer);
  const [search, setSearch] = React.useState<string | null>('');
  const { chats } = useChat();
  console.log(search);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <Search setText={setSearch} className={styles.search} />
      {chats.map((chat: IChats) => (
        <MessagesCard key={chat.messagesWith} chat={chat} />
      ))}
      {chats.length <= 0 && <h3 className={styles.searchResult}>Ничего не найдено</h3>}
    </div>
  );
};
