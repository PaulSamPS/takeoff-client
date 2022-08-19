import React from 'react';
import { useRequest } from '../../../hooks/useRequest';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { useAppSelector } from '../../../hooks/redux';
import { IUser } from '../../../interfaces/user.interface';

import cn from 'classnames';

import styles from './Friends.module.scss';

export const Friends = (): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);

  const { friendsUserInfo } = useRequest();
  const friendsOnline: IUser[] = [];

  const { id } = useParams();

  React.useEffect(() => {
    friendsUserInfo.filter((friend) => {
      return users.forEach((user) => {
        if (friend.id === user.userId) {
          friendsOnline.push(friend as IUser);
        }
      });
    });
  }, []);

  const handleClickSetUserId = () => {
    localStorage.setItem('friendsUserInfo', id!);
    localStorage.setItem('followId', id!);
  };

  return (
    <div className={styles.wrapper}>
      <Link
        to={loginUser.id !== id ? '/main/user-friends' : '/main/friends'}
        className={styles.friendsCount}
        onClick={handleClickSetUserId}
      >
        Друзья <span className={styles.count}>{friendsUserInfo.length}</span>
      </Link>
      <div className={styles.friendsGrid}>
        {friendsUserInfo.slice(-6).map((friend) => (
          <div key={friend.id} className={styles.friend}>
            <Link to={`/main/profile/${friend.id}`} className={styles.avatar}>
              <img
                src={friend.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend.avatar}`}
                alt={friend.name.firstName + '' + friend.name.lastName}
              />
            </Link>
            <Link className={styles.name} to={`/main/profile/${friend.id}`}>
              {friend.name.firstName}
            </Link>
          </div>
        ))}
      </div>
      {friendsOnline.length > 0 && (
        <>
          <Link
            to={loginUser.id !== id ? '/main/user-friends' : '/main/friends'}
            className={cn(styles.friendsCount, styles.onlineCount)}
            onClick={() => localStorage.setItem('friendsUserInfo', id!)}
          >
            Друзья онлайн <span className={styles.count}>{friendsOnline.length}</span>
          </Link>
          <div className={styles.friendsGrid}>
            {friendsOnline.slice(-6).map((onlineFriend) => (
              <div key={onlineFriend.id} className={styles.friend}>
                <Link to={`/main/profile/${onlineFriend.id}`} className={styles.avatar}>
                  <img
                    src={
                      onlineFriend.avatar == null
                        ? `/photo.png`
                        : `${API_URL}/avatar/${onlineFriend.avatar}`
                    }
                    alt={onlineFriend.name.firstName + '' + onlineFriend.name.lastName}
                  />
                </Link>
                <Link className={styles.name} to={`/main/profile/${onlineFriend.id}`}>
                  {onlineFriend.name.firstName}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
