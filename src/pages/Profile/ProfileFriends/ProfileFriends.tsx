import React from 'react';
import styles from './ProfileFriends.module.scss';
import { useRequest } from '../../../hooks/useRequest';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { useAppSelector } from '../../../hooks/redux';
import { IUser } from '../../../interfaces/user.interface';
import cn from 'classnames';

export const ProfileFriends = (): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);

  const { friendsUserInfo } = useRequest();
  const friendsOnline: IUser[] = [];

  const { id } = useParams();

  friendsUserInfo.filter((friend) => {
    return users.forEach((user) => {
      if (friend.id === user.userId) {
        friendsOnline.push(friend as IUser);
      }
    });
  });

  return (
    <div className={styles.wrapper}>
      <Link
        to={loginUser.id !== id ? '/main/user-friends' : '/main/friends'}
        className={styles.friendsCount}
        onClick={() => localStorage.setItem('friendsUserInfo', id!)}
      >
        Друзья <span className={styles.count}>{friendsUserInfo.length}</span>
      </Link>
      <div className={styles.friendsGrid}>
        {friendsUserInfo.slice(-6).map((friend) => (
          <div key={friend.id} className={styles.friend}>
            <Link to={`/main/profile/${friend.id}`} className={styles.avatar}>
              <img
                src={friend.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend.avatar}`}
                alt={friend.firstName + '' + friend.lastName}
              />
            </Link>
            <Link className={styles.name} to={`/main/profile/${friend.id}`}>
              {friend.firstName}
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
                    alt={onlineFriend.firstName + '' + onlineFriend.lastName}
                  />
                </Link>
                <Link className={styles.name} to={`/main/profile/${onlineFriend.id}`}>
                  {onlineFriend.firstName}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
