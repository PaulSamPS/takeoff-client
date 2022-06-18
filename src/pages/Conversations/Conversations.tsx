import React from 'react';
import { useChat } from '../../hooks/useChat';
import { API_URL } from '../../http/axios';
import styles from './Conversations.module.scss';
import { useNavigate } from 'react-router-dom';
import { calculateTime } from '../../helpers/calculateTime';
import { Search } from '../../components/Search/Search';
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
  const { chats, users, loading } = useChat();
  const navigate = useNavigate();
  const usersOnline = users.map((user: any) => user.userId);
  const [search, setSearch] = React.useState<string>('');

  const filteredChats = React.useMemo(() => {
    if (search.length < 2) {
      return chats;
    }
    return chats.filter((chat: IChats) => {
      return chat.name.toLocaleLowerCase().search(search.toLocaleLowerCase()) !== -1;
    });
  }, [search, users]);

  const navigateToChat = (id: string) => {
    localStorage.setItem('id', id);
    navigate(`${id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <Search setSearch={setSearch} search={search} />
      {filteredChats.length == 0 && <h3 className={styles.searchResult}>Ничего не найдено</h3>}
      {filteredChats &&
        filteredChats.map((chat: IChats, index: number) => (
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
            <div className={styles.item}>
              <h3>{chat.name}</h3>
              <p onClick={() => navigateToChat(chat.messagesWith)}>{chat.lastMessage}</p>
            </div>
            <div className={styles.right}>
              {chat.countUnreadMessages > 0 && (
                <div className={styles.unreadMessages}>{chat.countUnreadMessages}</div>
              )}
              <span>{calculateTime(chat.date)}</span>
            </div>
          </div>
        ))}
    </div>
  );
};
