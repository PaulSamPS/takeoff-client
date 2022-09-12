import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { useAppSelector } from '../../../hooks/redux';
import { IUser } from '../../../interfaces/user.interface';
import { ProfileFriendsProps } from './Friends.props';
import { Spinner } from '../../UI';
import { useRequest } from '../../../hooks/useRequest';
import { AVATAR_URL } from '../../../helpers/constants';

import cn from 'classnames';

import styles from './Friends.module.scss';

export const Friends = ({}: ProfileFriendsProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const { friendsUserInfo } = useAppSelector((state) => state.friendsUserInfoReducer);

  const friendsOnline: IUser[] = [];

  const { loadingFriends } = useRequest();
  const { id } = useParams();

  React.useEffect(() => {
    if (friendsUserInfo !== null) {
      friendsUserInfo.filter((friend) => {
        return users.forEach((user) => {
          if (friend.id === user.userId) {
            friendsOnline.push(friend as IUser);
          }
        });
      });
    }
  }, [id]);

  const handleClickSetUserId = () => {
    localStorage.setItem('friendsUserInfo', id!);
    localStorage.setItem('followId', id!);
  };

  return (
    <div className={styles.wrapper}>
      {loadingFriends ? (
        <Spinner />
      ) : (
        <>
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
                    src={
                      friend.avatar == null
                        ? `/photo.png`
                        : `${API_URL}/${AVATAR_URL}/${friend.avatar}`
                    }
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
                            : `${API_URL}/${AVATAR_URL}/${onlineFriend.avatar}`
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
        </>
      )}
    </div>
  );
};
