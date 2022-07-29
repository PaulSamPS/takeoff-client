import React from 'react';
import { API_URL } from '../../http/axios';
import styles from './PeopleFindCard.module.scss';
import { Link } from 'react-router-dom';
import { PeopleFindCardProps } from './PeopleFindCard.props';
import { ReactComponent as AddFriendIcon } from '../../helpers/icons/addFriend.svg';
import { ReactComponent as AllReadyFriendsIcon } from '../../helpers/icons/allreadyFriens.svg';
import { useRequest } from '../../hooks/useRequest';
import { useFollow } from '../../hooks/useFollow';
import { useAppSelector } from '../../hooks/redux';

export const PeopleFindCard = ({ user }: PeopleFindCardProps): JSX.Element => {
  const { friends, request } = useRequest();
  const { handleFollow, followings } = useFollow();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const friend = friends.map((f) => f.id);
  const followingsDone = followings !== null ? followings.map((f) => f.id) : [];
  const requestsDone = request.map((request) => request.id);

  const handleClickFollow = () => {
    localStorage.setItem('followId', user.id);
    handleFollow();
  };

  return (
    <div className={styles.wrapper}>
      <Link to={`/main/profile/${user.id}`} className={styles.avatar}>
        <img
          src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
          alt={user.firstName + ' ' + user.lastName}
        />
      </Link>
      <div className={styles.info}>
        <Link to={`/main/profile/${user.id}`}>{user.firstName + ' ' + user.lastName}</Link>
        {friend.includes(user.id) ||
        followingsDone.includes(loginUser.id) ||
        requestsDone.includes(user.id) ? (
          <AllReadyFriendsIcon className={styles.allReadyFriends} />
        ) : (
          <AddFriendIcon className={styles.addFriend} onClick={handleClickFollow} />
        )}
      </div>
    </div>
  );
};
