import React from 'react';
import { API_URL } from '../../http/axios';
import { Link } from 'react-router-dom';
import { PeopleFindCardProps } from './PeopleFindCard.props';
import { ReactComponent as AddFriendIcon } from '../../helpers/icons/addFriend.svg';
import { ReactComponent as AllReadyFriendsIcon } from '../../helpers/icons/allreadyFriens.svg';
import { useRequest } from '../../hooks/useRequest';
import { useFollow } from '../../hooks/useFollow';
import { useAppSelector } from '../../hooks/redux';

import styles from './PeopleFindCard.module.scss';

export const PeopleFindCard = ({ user }: PeopleFindCardProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [visibleIcon, setVisibleIcon] = React.useState<boolean>(false);

  const { friends, request } = useRequest();
  const { handleFollow, followings } = useFollow();

  const friend = friends.map((f) => f.id);
  const followingsDone = followings !== null ? followings.map((f) => f.id) : [];
  const requestsDone = request.map((request) => request.id);

  const handleClickFollow = () => {
    localStorage.setItem('followId', user.id);
    handleFollow();
  };

  const handleHover = () => {
    localStorage.setItem('followId', user.id);
    setVisibleIcon(true);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleHover}
      onMouseLeave={() => setVisibleIcon(false)}
    >
      <Link to={`/main/profile/${user.id}`} className={styles.avatar}>
        <img
          src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
          alt={user.name.firstName + ' ' + user.name.lastName}
        />
      </Link>
      <div className={styles.info}>
        <Link to={`/main/profile/${user.id}`}>
          {user.name.firstName + ' ' + user.name.lastName}
        </Link>
        {visibleIcon && (
          <>
            {friend.includes(user.id) ||
            requestsDone.includes(user.id) ||
            followingsDone.includes(loginUser.id) ? (
              <AllReadyFriendsIcon className={styles.allReadyFriends} />
            ) : (
              <AddFriendIcon className={styles.addFriend} onClick={handleClickFollow} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
