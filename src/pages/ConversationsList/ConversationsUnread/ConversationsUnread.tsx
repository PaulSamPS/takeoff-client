import React from 'react';
import styles from '../Conversations/Conversations.module.scss';
import { Search } from '../../../components/Search/Search';
import { MessagesCard } from '../../../components/MessagesCard/MessagesCard';
import { useAppSelector } from '../../../hooks/redux';
import { useChat } from '../../../hooks/useChat';
import { Spinner } from '../../../components/Spinner/Spinner';

interface IChats {
  avatar: string | null;
  date: Date;
  lastMessage: string;
  messagesWith: string;
  name: string;
  countUnreadMessages: number;
}

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
          chats.filter((chat: IChats) => chat.countUnreadMessages).length <= 0 ? 'grid' : 'block',
        height:
          chats.filter((chat: IChats) => chat.countUnreadMessages).length > 0
            ? 'fit-content'
            : 'calc(100vh - 160px)',
      }}
    >
      <Search setText={setSearch} className={styles.search} placeholder={'Поиск'} />
      {chats.map(
        (chat: IChats) =>
          chat.countUnreadMessages > 0 && (
            <MessagesCard key={chat.messagesWith} chat={chat} className={styles.card} />
          )
      )}
      {chats.filter((chat: IChats) => chat.countUnreadMessages).length <= 0 && (
        <span className={styles.noMessages}>Нет сообщений</span>
      )}
    </div>
  );
};
