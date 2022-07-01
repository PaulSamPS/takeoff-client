import React from 'react';
import styles from '../FriendsList/Friendslist.module.scss';
import { Outlet } from 'react-router-dom';
import { RightBar } from '../../components/RightBar/RightBar';
import { useChat } from '../../hooks/useChat';

export const ConversationsList = () => {
  const { chats } = useChat();
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <RightBar
        arr={chats}
        firstItem={'Все чаты'}
        secondItem={'Непрочитанные'}
        firstItemLink={'/main/conversations'}
        secondItemLink={'/main/conversations/unread'}
      />
    </div>
  );
};
