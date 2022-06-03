import React from 'react';
import { useChat } from '../../hooks/useChat';
import { API_URL } from '../../http/axios';
import styles from './Conversations.module.scss';
import moment from 'moment';
import 'moment/locale/ru';
import { useNavigate } from 'react-router-dom';

interface IChats {
  avatar: string | null;
  date: string;
  lastMessage: string;
  messagesWith: string;
  name: string;
}

moment.locale('ru');

export const Conversations = () => {
  const { chats } = useChat();
  const navigate = useNavigate();

  const navigateToChat = (id: string) => {
    localStorage.setItem('id', id);
    navigate(`${id}`);
  };

  return (
    <div className={styles.wrapper}>
      {chats.map((chat: IChats, index: number) => (
        <div key={index} className={styles.conversation}>
          <img
            src={
              chat.avatar === '' || chat.avatar === null
                ? `/photo.png`
                : `${API_URL}/avatar/${chat.avatar}`
            }
            alt={chat.name}
          />
          <div className={styles.item}>
            <h3>{chat.name}</h3>
            <p onClick={() => navigateToChat(chat.messagesWith)}>{chat.lastMessage}</p>
          </div>
          <span>{moment(chat.date).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};
