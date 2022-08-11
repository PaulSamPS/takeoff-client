import React from 'react';
import styles from './Friiend.module.scss';
import { useRequest } from '../../../hooks/useRequest';
import cn from 'classnames';
import { useAppSelector } from '../../../hooks/redux';
import { FriendsAll } from './FriendsAll/FriendsAll';
import { FriendsOnline } from './FriendsOnline/FriendsOnline';
import { IUser } from '../../../interfaces/user.interface';
import { useFollow } from '../../../hooks/useFollow';

export const Friends = (): JSX.Element => {
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);

  const [activeSort, setActiveSort] = React.useState<number>(0);

  const { friends, friendsUserInfo } = useRequest();
  const { followings } = useFollow();

  const friendsOnline: IUser[] = [];
  const friendsOnlineUser: IUser[] = [];

  friends.filter((friend) => {
    return users.forEach((user) => {
      if (friend.id === user.userId) {
        friendsOnline.push(friend);
      }
    });
  });

  friendsUserInfo !== null &&
    friendsUserInfo.filter((friend) => {
      return users.forEach((user) => {
        if (friend.id === user.userId) {
          friendsOnlineUser.push(friend);
        }
      });
    });

  React.useEffect(() => {
    document.getElementById('input')?.focus();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        {window.location.pathname === '/main/user-friends/followers' && (
          <div className={styles.title}>
            Подписчики <span>{followings !== null ? followings.length : 0}</span>
          </div>
        )}
        {window.location.pathname !== '/main/user-friends/followers' && (
          <>
            <div
              className={cn(styles.sort, {
                [styles.activeSort]: activeSort === 0,
              })}
              onClick={() => setActiveSort(0)}
            >
              {window.location.pathname === '/main/friends' && (
                <>
                  Все друзья <span>{friends.length}</span>
                </>
              )}
              {window.location.pathname === '/main/user-friends' && (
                <>
                  Все друзья <span>{friendsUserInfo!.length}</span>
                </>
              )}
            </div>
            <div
              className={cn(styles.sort, {
                [styles.activeSort]: activeSort === 1,
              })}
              onClick={() => setActiveSort(1)}
            >
              {window.location.pathname === '/main/friends' && (
                <>
                  Друзья онлайн <span>{friendsOnline.length}</span>
                </>
              )}
              {window.location.pathname === '/main/user-friends' && (
                <>
                  Друзья онлайн <span>{friendsOnlineUser.length}</span>
                </>
              )}
            </div>
          </>
        )}
      </div>
      {activeSort === 0 ? (
        <FriendsAll />
      ) : (
        <FriendsOnline friendsOnline={friendsOnline} friendsOnlineUser={friendsOnlineUser} />
      )}
    </div>
  );
};
