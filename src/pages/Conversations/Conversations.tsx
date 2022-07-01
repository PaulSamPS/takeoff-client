import React from 'react';
import { useChat } from '../../hooks/useChat';
import { API_URL } from '../../http/axios';
import styles from './Conversations.module.scss';
import { useNavigate } from 'react-router-dom';
import { calculateTime } from '../../helpers/calculateTime';
import { Search } from '../../components/Search/Search';
import { useAppSelector } from '../../hooks/redux';
import { Spinner } from '../../components/Spinner/Spinner';

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
  const { chats, users } = useChat();
  const navigate = useNavigate();
  const usersOnline = users.map((user: any) => user.userId);
  const [search, setSearch] = React.useState<string | null>('');
  console.log(search);

  const navigateToChat = (id: string) => {
    localStorage.setItem('id', id);
    navigate(`${id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <Search setText={setSearch} />
      {chats &&
        chats.map((chat: IChats, index: number) => (
          <div key={index} className={styles.conversation}>
            <div className={styles.avatar}>
              <img
                src={
                  chat.avatar === '' || chat.avatar === null
                    ? `/photo.png`
                    : `${API_URL}/avatar/${chat.avatar}`
                }
                alt={chat.name}
              />
              {usersOnline.includes(chat.messagesWith) && <div className={styles.online} />}
            </div>
            <div className={styles.text}>
              <span className={styles.name}>{chat.name}</span>
              <span className={styles.message} onClick={() => navigateToChat(chat.messagesWith)}>
                {chat.lastMessage.substring(0, 50)}...
              </span>
            </div>
            <div className={styles.right}>
              <span>{calculateTime(chat.date)}</span>
              {chat.countUnreadMessages > 0 && (
                <span className={styles.unreadMessages}>{chat.countUnreadMessages}</span>
              )}
            </div>
          </div>
        ))}
      {chats.length <= 0 && <h3 className={styles.searchResult}>Ничего не найдено</h3>}
    </div>
  );
};
