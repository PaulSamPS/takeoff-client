import React from 'react';
import { useChat } from '../../hooks/useChat';
import { API_URL } from '../../http/axios';
import styles from './Conversations.module.scss';

interface IChats {
  avatar: string | null;
  date: string;
  lastMessage: string;
  messagesWith: string;
  name: string;
}

export const Conversations = () => {
  const { chats, messages } = useChat();
  console.log(messages);
  return (
    <div className={styles.wrapper}>
      {chats.map((chat: IChats, index: number) => (
        <div key={index}>
          <img
            src={
              chat.avatar === '' || chat.avatar === null
                ? `/photo.png`
                : `${API_URL}/avatar/${chat.avatar}`
            }
            alt={chat.name}
          />
          <div>{chat.name}</div>
          <div>{chat.lastMessage}</div>
        </div>
      ))}
    </div>
  );
};
