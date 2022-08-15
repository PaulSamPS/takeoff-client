import React from 'react';
import styles from './FriendsOnline.module.scss';
import { FriendCard } from '../../../../components/FriendCard/FriendCard';
import { Search } from '../../../../components/UI/Search/Search';
import { FriendOnlineProps } from './FriendOnline.props';
import { useLocation } from 'react-router-dom';

export const FriendsOnline = ({
  friendsOnline,
  friendsOnlineUser,
}: FriendOnlineProps): JSX.Element => {
  const [text, setText] = React.useState<string>('');
  const { pathname } = useLocation();

  const filteredOnlineFriends = friendsOnline.filter((friend) =>
    (friend.name.firstName.toLowerCase() + '' + friend.name.lastName.toLowerCase()).includes(
      text?.toLowerCase()
    )
  );

  const filteredOnlineUsersFriends = friendsOnlineUser.filter((friend) =>
    (friend.name.firstName.toLowerCase() + '' + friend.name.lastName.toLowerCase()).includes(
      text?.toLowerCase()
    )
  );

  return (
    <div className={styles.wrapper}>
      <Search setText={setText} placeholder={'Поиск друзей'} />
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
