import React from 'react';
import styles from './MessagesCard.module.scss';
import { API_URL } from '../../http/axios';
import { Link } from 'react-router-dom';
import { calculateTime } from '../../helpers/calculateTime';
import { useChat } from '../../hooks/useChat';
import { MessagesCardProp } from './MessagesCard.prop';

export const MessagesCard = ({ chat }: MessagesCardProp) => {
  const { users } = useChat();
  const usersOnline = users.map((user: any) => user.userId);
  return (
    <div className={styles.wrapper}>
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
      <Link to={`${chat.messagesWith}`} className={styles.body}>
        <div className={styles.text}>
          <span className={styles.name}>{chat.name}</span>
          <span className={styles.message}>{chat.lastMessage.substring(0, 50)}...</span>
        </div>
        <div className={styles.right}>
          <span>{calculateTime(chat.date)}</span>
          {chat.countUnreadMessages > 0 && (
            <span className={styles.unreadMessages}>{chat.countUnreadMessages}</span>
          )}
        </div>
      </Link>
    </div>
  );
};
