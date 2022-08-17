import React from 'react';
import styles from './MessagesCard.module.scss';
import { API_URL } from '../../http/axios';
import { Link } from 'react-router-dom';
import { calculateTime } from '../../helpers/calculateTime';
import { MessagesCardProp } from './MessagesCard.prop';
import { useAppDispatch } from '../../hooks/redux';
import { setOpenChat } from '../../redux/reducers/openChatReducer';
import cn from 'classnames';
import { Count } from '../Count/Count';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';

export const MessagesCard = ({ chat, className }: MessagesCardProp): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleOpenChat = () => {
    localStorage.setItem('receiverUserId', chat.messagesWith);
    const openChat = {
      name: chat.name,
      link: `/main/conversations/${chat.messagesWith}`,
      id: chat.messagesWith,
    };
    dispatch(setOpenChat(openChat));
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <Link to={`/main/profile/${chat.messagesWith}`} className={styles.avatar}>
        <img
          src={
            chat.avatar === '' || chat.avatar === null
              ? `/photo.png`
              : `${API_URL}/avatar/${chat.avatar}`
          }
          alt={chat.name}
        />
      </Link>
      <Link
        to={`/main/conversations/${chat.messagesWith}`}
        className={styles.body}
        onClick={handleOpenChat}
      >
        <div className={styles.text}>
          <span className={styles.name}>{chat.name}</span>
          <span className={styles.message}>
            {' '}
            {reactStringReplace(chat.lastMessage, /:(.+?):/g, (match, i) => (
              <Emoji key={i} emoji={match} set='apple' size={16} native={false} />
            ))}
          </span>
        </div>
        <div className={styles.right}>
          <span>{calculateTime(chat.date)}</span>
          {chat.countUnreadMessages > 0 && <Count>{chat.countUnreadMessages}</Count>}
        </div>
      </Link>
    </div>
  );
};
