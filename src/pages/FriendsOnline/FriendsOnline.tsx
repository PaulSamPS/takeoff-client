import React from 'react';
import styles from './FriendsOnline.module.scss';
import { FriendCard } from '../../components/FriendCard/FriendCard';
import { useRequest } from '../../hooks/useRequest';
import { Search } from '../../components/Search/Search';
import { useAppSelector } from '../../hooks/redux';

export const FriendsOnline = () => {
  const { friends } = useRequest();
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const [text, setText] = React.useState<string>('');
  const onlineUsers = users.map((user) => user.userId);
  const onlineFriends = friends.map((f) => f.id).toString();
  console.log(text);

  document.getElementById('input')?.focus();

  return (
    <div
      className={styles.wrapper}
      style={{
        height: onlineUsers.includes(onlineFriends) ? 'fit-content' : 'calc(100vh - 216px)',
      }}
    >
      <Search setText={setText} />
      <div
        className={styles.grid}
        style={{
          display: onlineUsers.includes(onlineFriends) ? 'block' : 'flex',
          justifyContent: onlineUsers.includes(onlineFriends) ? '' : 'center',
        }}
      >
        {onlineUsers.includes(onlineFriends) ? (
          friends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
        ) : (
          <span className={styles.noOnlineFriends}>Друзей онлайн нет</span>
        )}
      </div>
    </div>
  );
};
