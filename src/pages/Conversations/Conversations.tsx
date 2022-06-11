import React from 'react';
import { useChat } from '../../hooks/useChat';
import { API_URL } from '../../http/axios';
import styles from './Conversations.module.scss';
import { useNavigate } from 'react-router-dom';
import { calculateTime } from '../../helpers/calculateTime';

interface IChats {
  avatar: string | null;
  date: Date;
  lastMessage: string;
  messagesWith: string;
  name: string;
}

export const Conversations = () => {
  const { chats, users } = useChat();
  const navigate = useNavigate();
  const usersOnline = users.map((user: any) => user.userId);

  const navigateToChat = (id: string) => {
    localStorage.setItem('id', id);
    navigate(`${id}`);
  };

  return (
    <div className={styles.wrapper}>
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
            <div className={styles.item}>
              <h3>{chat.name}</h3>
              <p onClick={() => navigateToChat(chat.messagesWith)}>{chat.lastMessage}</p>
            </div>
            <span>{calculateTime(chat.date)}</span>
          </div>
        ))}
    </div>
  );
};
