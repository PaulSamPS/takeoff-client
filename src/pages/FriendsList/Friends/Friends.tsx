import React from 'react';
import styles from './Friends.module.scss';
import { useRequest } from '../../../hooks/useRequest';
import cn from 'classnames';
import { useAppSelector } from '../../../hooks/redux';
import { All } from './All/All';
import { Online } from './Online/Online';
import { IUser } from '../../../interfaces/user.interface';
import { useFollow } from '../../../hooks/useFollow';
import { useLocation } from 'react-router-dom';

export const Friends = (): JSX.Element => {
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);

  const [activeSort, setActiveSort] = React.useState<number>(0);

  const { friends, friendsUserInfo } = useRequest();
  const { followings } = useFollow();
  const { pathname } = useLocation();

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
        {pathname === '/main/user-friends/followers' && (
          <div className={styles.title}>
            Подписчики <span>{followings !== null ? followings.length : 0}</span>
          </div>
        )}
        {pathname !== '/main/user-friends/followers' && (
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
              {pathname === '/main/friends' && (
                <>
                  Друзья онлайн <span>{friendsOnline.length}</span>
                </>
              )}
              {pathname === '/main/user-friends' && (
                <>
                  Друзья онлайн <span>{friendsOnlineUser.length}</span>
                </>
              )}
            </div>
          </>
        )}
      </div>
      {activeSort === 0 || pathname === '/main/user-friends/followers' ? (
        <All />
      ) : (
        <Online friendsOnline={friendsOnline} friendsOnlineUser={friendsOnlineUser} />
      )}
    </div>
  );
};
