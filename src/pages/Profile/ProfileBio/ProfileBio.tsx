import React from 'react';
import styles from './ProfileBio.module.scss';
import { calculateTime } from '../../../helpers/calculateTime';
import { Link, useParams } from 'react-router-dom';
import { calculateFriendsCount } from '../../../helpers/calculateFriendsCount';
import { calculateFollowersCount } from '../../../helpers/calculateFollowersCount';
import { ProfileBioProps } from './ProfileBio.props';
import { useAppSelector } from '../../../hooks/redux';
import { useRequest } from '../../../hooks/useRequest';
import { useFollow } from '../../../hooks/useFollow';

export const ProfileBio = ({ user }: ProfileBioProps) => {
  const { friendsUserInfo } = useRequest();
  const { followings } = useFollow();
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const usersOnline = users.map((user: any) => user.userId);
  const { id } = useParams();

  return (
    <div className={styles.bio}>
      <div className={styles.top}>
        <h1>{user?.name}</h1>
        {usersOnline.includes(id) ? (
          <div className={styles.online}>
            online <div className={styles.green} />
          </div>
        ) : (
          <div className={styles.lastVisit}>был в сети {user && calculateTime(user.lastVisit)}</div>
        )}
      </div>
      <div className={styles.middle}>
        <div className={styles.block}>
          <h3 className={styles.item}>Город:</h3>
          <span className={styles.itemName}>Оренбург</span>
        </div>
        <div className={styles.block}>
          <h3 className={styles.item}>Языки:</h3>
          <span className={styles.itemName}>Русский</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <Link to={'#'} className={styles.friends}>
          <span className={styles.count}>{friendsUserInfo.length}</span>
          {calculateFriendsCount(friendsUserInfo.length)}
        </Link>
        <Link to={'#'} className={styles.friends}>
          <span className={styles.count}>{followings && followings.length}</span>
          {calculateFollowersCount(followings && followings.length)}
        </Link>
      </div>
    </div>
  );
};
