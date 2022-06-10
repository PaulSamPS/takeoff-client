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
  const { lastMessage, users } = useChat();
  const navigate = useNavigate();
  const usersOnline = users.map((user: any) => user.userId);
  const navigateToChat = (id: string) => {
    localStorage.setItem('id', id);
    navigate(`${id}`);
  };

  return (
    <div className={styles.wrapper}>
      {lastMessage &&
        lastMessage.map((msg: IChats, index: number) => (
          <div key={index} className={styles.conversation}>
            <div className={styles.avatar}>
              <img
                src={
                  msg.avatar === '' || msg.avatar === null
                    ? `/photo.png`
                    : `${API_URL}/avatar/${msg.avatar}`
                }
                alt={msg.name}
              />
              {usersOnline.includes(msg.messagesWith) && <div className={styles.online} />}
            </div>
            <div className={styles.item}>
              <h3>{msg.name}</h3>
              <p onClick={() => navigateToChat(msg.messagesWith)}>{msg.lastMessage}</p>
            </div>
            <span>{calculateTime(msg.date)}</span>
          </div>
        ))}
    </div>
  );
};
