import React from 'react';
import styles from './ProfileFriends.module.scss';
import { useRequest } from '../../../hooks/useRequest';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { useAppSelector } from '../../../hooks/redux';
import { IUser } from '../../../interfaces/user.interface';
import cn from 'classnames';

export const ProfileFriends = () => {
  const { friendsUserInfo } = useRequest();
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const friendsOnline: IUser[] = [];

  friendsUserInfo.filter((friend) => {
    return users.forEach((user) => {
      if (friend.id === user.userId) {
        friendsOnline.push(friend as IUser);
      }
    });
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.friendsCount}>
        Друзья <span className={styles.count}>{friendsUserInfo.length}</span>
      </div>
      <div className={styles.friendsGrid}>
        {friendsUserInfo.slice(-6).map((friend) => (
          <div key={friend.id} className={styles.friend}>
            <Link to={`/main/profile/${friend.id}`} className={styles.avatar}>
              <img
                src={friend.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend.avatar}`}
                alt={friend.name}
              />
            </Link>
            <Link className={styles.name} to={`/main/profile/${friend.id}`}>
              {friend.name}
            </Link>
          </div>
        ))}
      </div>
      {friendsOnline.length > 0 && (
        <>
          <div className={cn(styles.friendsCount, styles.onlineCount)}>
            Друзья онлайн <span className={styles.count}>{friendsOnline.length}</span>
          </div>
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
                    alt={onlineFriend.name}
                  />
                </Link>
                <Link className={styles.name} to={`/main/profile/${onlineFriend.id}`}>
                  {onlineFriend.name}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
