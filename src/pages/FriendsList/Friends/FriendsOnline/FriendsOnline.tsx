import React from 'react';
import styles from './FriendsOnline.module.scss';
import { FriendCard } from '../../../../components/FriendCard/FriendCard';
import { Search } from '../../../../components/UI/Search/Search';
import { FriendOnlineProps } from './FriendOnline.props';
import { useFollow } from '../../../../hooks/useFollow';

export const FriendsOnline = ({ friendsOnline, friendsOnlineUser }: FriendOnlineProps) => {
  const [text, setText] = React.useState<string>('');
  const { followings } = useFollow();

  const filteredOnlineFriends = friendsOnline.filter((friend) =>
    (friend.firstName.toLowerCase() + '' + friend.lastName.toLowerCase()).includes(
      text?.toLowerCase()
    )
  );

  const filteredOnlineUsersFriends = friendsOnlineUser.filter((friend) =>
    (friend.firstName.toLowerCase() + '' + friend.lastName.toLowerCase()).includes(
      text?.toLowerCase()
    )
  );

  const conditions =
    window.location.pathname !== '/main/user-friends'
      ? filteredOnlineFriends.length > 0
      : filteredOnlineUsersFriends.length > 0;

  return (
    <div
      className={styles.wrapper}
      style={{
        height: conditions ? 'fit-content' : 'calc(100vh - 216px)',
      }}
    >
      <Search
        setText={setText}
        placeholder={
          window.location.pathname === '/main/user-friends/followers'
            ? 'Поиск подписчиков'
            : 'Поиск друзей'
        }
      />
      <div
        className={styles.grid}
        style={{
          display: conditions ? 'block' : 'flex',
          justifyContent: conditions ? '' : 'center',
        }}
      >
        {window.location.pathname === '/main/friends' && (
          <>
            {filteredOnlineFriends.length > 0 ? (
              filteredOnlineFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
            ) : (
              <div className={styles.noOnlineFriends}>Друзей онлайн нет</div>
            )}
          </>
        )}
        {window.location.pathname === '/main/user-friends' && (
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
        {window.location.pathname === '/main/user-friends/followers' && (
          <>
            {followings.length > 0 ? (
              followings.map((friend) => <FriendCard key={friend.id} friend={friend} />)
            ) : (
              <div className={styles.noOnlineFriends}>Подписчиков нет</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
