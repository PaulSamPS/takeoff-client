import React from 'react';
import styles from './FriendsAll.module.scss';
import { FriendCard } from '../../../../components/FriendCard/FriendCard';
import { useRequest } from '../../../../hooks/useRequest';
import { Search } from '../../../../components/Search/Search';

export const FriendsAll = () => {
  const { friends } = useRequest();
  const [text, setText] = React.useState<string>('');
  console.log(text);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(text?.toLowerCase())
  );

  return (
    <div
      className={styles.wrapper}
      style={{ height: filteredFriends.length > 0 ? 'fit-content' : 'calc(100vh - 216px)' }}
    >
      <Search setText={setText} placeholder={'Поиск друзей'} />
      <div
        className={styles.grid}
        style={{
          display: filteredFriends.length > 0 ? 'block' : 'flex',
          justifyContent: filteredFriends.length > 0 ? '' : 'center',
        }}
      >
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
        ) : (
          <span className={styles.noFriends}>Друзей нет</span>
        )}
      </div>
    </div>
  );
};
