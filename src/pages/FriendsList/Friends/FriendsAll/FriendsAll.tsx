import React from 'react';
import styles from './FriendsAll.module.scss';
import { FriendCard } from '../../../../components/FriendCard/FriendCard';
import { Search } from '../../../../components/UI/Search/Search';
import { useRequest } from '../../../../hooks/useRequest';
import { useFollow } from '../../../../hooks/useFollow';

export const FriendsAll = (): JSX.Element => {
  const [text, setText] = React.useState<string>('');

  const { friends, friendsUserInfo } = useRequest();
  const { followings } = useFollow();

  const filteredFriends = friends.filter((friend) =>
    (friend.firstName.toLowerCase() + '' + friend.lastName.toLowerCase()).includes(
      text?.toLowerCase()
    )
  );

  const userFilteredFriends = friendsUserInfo
    ? friendsUserInfo.filter((friend) =>
        (friend.firstName.toLowerCase() + '' + friend.lastName.toLowerCase()).includes(
          text?.toLowerCase()
        )
      )
    : [];

  const filteredFollowers = followings
    ? followings.filter((follower) =>
        (follower.firstName.toLowerCase() + '' + follower.lastName.toLowerCase()).includes(
          text?.toLowerCase()
        )
      )
    : [];

  return (
    <div className={styles.wrapper}>
      <Search setText={setText} placeholder={'Поиск друзей'} />
      <div className={styles.grid}>
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
        {window.location.pathname === '/main/user-friends/followers' && (
          <>
            {filteredFollowers.length > 0 ? (
              filteredFollowers.map((follower) => (
                <FriendCard key={follower.id} friend={follower} />
              ))
            ) : (
              <span className={styles.noFriends}>Подписчиков нет</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
