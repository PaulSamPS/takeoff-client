import React from 'react';
import styles from './FriendsAll.module.scss';
import { FriendCard } from '../../components/FriendCard/FriendCard';
import { useRequest } from '../../hooks/useRequest';
import { Search } from '../../components/Search/Search';

export const FriendsAll = () => {
  const { friends } = useRequest();
  const [text, setText] = React.useState<string | null>('');
  console.log(text);

  return (
    <div className={styles.wrapper} style={{ height: friends.length > 0 ? 'fit-content' : '' }}>
      {friends.length > 0 && <Search setText={setText} />}
      <div
        className={styles.grid}
        style={{
          display: friends.length > 0 ? 'block' : 'flex',
          justifyContent: friends.length > 0 ? '' : 'center',
        }}
      >
        {friends.length > 0 ? (
          friends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
        ) : (
          <span className={styles.noFriends}>Друзей пока нет</span>
        )}
      </div>
    </div>
  );
};
