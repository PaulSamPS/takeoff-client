import React from 'react';
import styles from './FriendsOnline.module.scss';
import { FriendCard } from '../../../../components/FriendCard/FriendCard';
import { Search } from '../../../../components/UI/Search/Search';
import { FriendOnlineProps } from './FriendOnline.props';

export const FriendsOnline = ({ friendsOnline, friendsOnlineUser }: FriendOnlineProps) => {
  const [text, setText] = React.useState<string>('');

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

  return (
    <div
      className={styles.wrapper}
      style={{
        height:
          filteredOnlineFriends.length > 0 || filteredOnlineUsersFriends.length > 0
            ? 'fit-content'
            : 'calc(100vh - 216px)',
      }}
    >
      <Search setText={setText} placeholder={'Поиск друзей'} />
      <div
        className={styles.grid}
        style={{
          display:
            filteredOnlineFriends.length > 0 || filteredOnlineUsersFriends.length > 0
              ? 'block'
              : 'flex',
          justifyContent:
            filteredOnlineFriends.length > 0 || filteredOnlineUsersFriends.length > 0
              ? ''
              : 'center',
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
      </div>
    </div>
  );
};
