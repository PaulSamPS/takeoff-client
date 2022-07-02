import React from 'react';
import styles from './Friiend.module.scss';
import { FriendCard } from '../../components/FriendCard/FriendCard';
import { useRequest } from '../../hooks/useRequest';
import cn from 'classnames';
import { Search } from '../../components/Search/Search';

export const Friends = () => {
  const { friends } = useRequest();
  const [text, setText] = React.useState<string | null>('');
  const [activeSort, setActiveSort] = React.useState<number>(0);
  console.log(text);

  document.getElementById('input')?.focus();

  return (
    <div className={styles.wrapper} style={{ display: friends.length <= 0 ? 'grid' : 'block' }}>
      {friends.length > 0 && (
        <div className={styles.top}>
          <div
            className={cn(styles.sort, {
              [styles.activeSort]: activeSort === 0,
            })}
            onClick={() => setActiveSort(0)}
          >
            Все друзья <span>{friends.length}</span>
          </div>
          <div
            className={cn(styles.sort, {
              [styles.activeSort]: activeSort === 1,
            })}
            onClick={() => setActiveSort(1)}
          >
            Друзья онлайн <span>2</span>
          </div>
        </div>
      )}
      {friends.length > 0 && <Search setText={setText} />}
      <div className={styles.cardGrid}>
        {friends.length > 0 ? (
          friends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
        ) : (
          <span className={styles.noFriends}>Друзей пока нет</span>
        )}
      </div>
    </div>
  );
};
