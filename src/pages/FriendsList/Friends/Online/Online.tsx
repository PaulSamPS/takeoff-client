import React, { FormEvent } from 'react';
import styles from './Online.module.scss';
import { FriendCard } from '../../../../components/FriendCard/FriendCard';
import { Search } from '../../../../components/UI';
import { OnlineProps } from './Online.props';
import { useLocation } from 'react-router-dom';

export const Online = ({ friendsOnline, friendsOnlineUser }: OnlineProps): JSX.Element => {
  const [search, setSearch] = React.useState<string>('');
  const { pathname } = useLocation();

  const filteredOnlineFriends = friendsOnline.filter((friend) =>
    (friend.name.firstName.toLowerCase() + '' + friend.name.lastName.toLowerCase()).includes(
      search?.toLowerCase()
    )
  );

  const filteredOnlineUsersFriends = friendsOnlineUser.filter((friend) =>
    (friend.name.firstName.toLowerCase() + '' + friend.name.lastName.toLowerCase()).includes(
      search?.toLowerCase()
    )
  );

  const handleSearch = (e: FormEvent<HTMLDivElement>) => {
    setSearch(e.currentTarget.textContent!.toString());
  };

  return (
    <div className={styles.wrapper}>
      <Search placeholder={'Поиск друзей'} onInput={handleSearch} />
      <div className={styles.grid}>
        {pathname === '/main/friends' && (
          <>
            {filteredOnlineFriends.length > 0 ? (
              filteredOnlineFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
            ) : (
              <div className={styles.noOnlineFriends}>Друзей онлайн нет</div>
            )}
          </>
        )}
        {pathname === '/main/user-friends' && (
          <>
            {filteredOnlineUsersFriends.length > 0 ? (
              filteredOnlineUsersFriends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))
            ) : (
              <div className={styles.noOnlineFriends}>Друзей онлайн нет</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
