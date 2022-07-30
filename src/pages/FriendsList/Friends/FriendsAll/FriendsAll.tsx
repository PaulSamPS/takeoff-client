import React from 'react';
import styles from './FriendsAll.module.scss';
import { FriendCard } from '../../../../components/FriendCard/FriendCard';
import { Search } from '../../../../components/UI/Search/Search';
import { useRequest } from '../../../../hooks/useRequest';

export const FriendsAll = () => {
  const { friends, friendsUserInfo } = useRequest();
  const [text, setText] = React.useState<string>('');

  const filteredFriends = friends.filter((friend) =>
    (friend.firstName.toLowerCase() + '' + friend.lastName.toLowerCase()).includes(
      text?.toLowerCase()
    )
  );

  const userFilteredFriends = friendsUserInfo.filter((friend) =>
    (friend.firstName.toLowerCase() + '' + friend.lastName.toLowerCase()).includes(
      text?.toLowerCase()
    )
  );

  return (
    <div
      className={styles.wrapper}
      style={{
        height:
          filteredFriends.length > 0 || userFilteredFriends.length > 0
            ? 'fit-content'
            : 'calc(100vh - 216px)',
      }}
    >
      <Search setText={setText} placeholder={'Поиск друзей'} />
      <div
        className={styles.grid}
        style={{
          display: filteredFriends.length > 0 || userFilteredFriends.length > 0 ? 'block' : 'flex',
          justifyContent:
            filteredFriends.length > 0 || userFilteredFriends.length > 0 ? '' : 'center',
        }}
      >
        {window.location.pathname === '/main/friends' && (
          <>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
            ) : (
              <span className={styles.noFriends}>Друзей нет</span>
            )}
          </>
        )}
        {window.location.pathname === '/main/user-friends' && (
          <>
            {userFilteredFriends.length > 0 ? (
              userFilteredFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
            ) : (
              <span className={styles.noFriends}>Друзей нет</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
