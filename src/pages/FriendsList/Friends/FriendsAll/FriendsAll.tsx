import React, { FormEvent } from 'react';
import styles from './FriendsAll.module.scss';
import { FriendCard } from '../../../../components/FriendCard/FriendCard';
import { Search } from '../../../../components/UI/Search/Search';
import { useRequest } from '../../../../hooks/useRequest';
import { useFollow } from '../../../../hooks/useFollow';
import { useLocation } from 'react-router-dom';

export const FriendsAll = (): JSX.Element => {
  const [search, setSearch] = React.useState<string>('');

  const { friends, friendsUserInfo } = useRequest();
  const { followings } = useFollow();
  const { pathname } = useLocation();

  const filteredFriends = friends.filter((friend) =>
    (friend.name.firstName.toLowerCase() + '' + friend.name.lastName.toLowerCase()).includes(
      search?.toLowerCase()
    )
  );

  const userFilteredFriends = friendsUserInfo
    ? friendsUserInfo.filter((friend) =>
        (friend.name.firstName.toLowerCase() + '' + friend.name.lastName.toLowerCase()).includes(
          search?.toLowerCase()
        )
      )
    : [];

  const filteredFollowers = followings
    ? followings.filter((follower) =>
        (
          follower.name.firstName.toLowerCase() +
          '' +
          follower.name.lastName.toLowerCase()
        ).includes(search?.toLowerCase())
      )
    : [];

  const handleSearch = (e: FormEvent<HTMLDivElement>) => {
    setSearch(e.currentTarget.textContent!.toString());
  };

  return (
    <div className={styles.wrapper}>
      <Search onInput={handleSearch} placeholder={'Поиск друзей'} />
      <div className={styles.grid}>
        {pathname === '/main/friends' && (
          <>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
            ) : (
              <span className={styles.noFriends}>Друзей нет</span>
            )}
          </>
        )}
        {pathname === '/main/user-friends' && (
          <>
            {userFilteredFriends.length > 0 ? (
              userFilteredFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
            ) : (
              <span className={styles.noFriends}>Друзей нет</span>
            )}
          </>
        )}
        {pathname === '/main/user-friends/followers' && (
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
