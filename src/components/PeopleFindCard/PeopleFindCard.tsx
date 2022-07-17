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

export const PeopleFindCard = React.memo(({ user }: PeopleFindCardProps): JSX.Element => {
  const { friends } = useRequest();
  const { handleFollow, followings } = useFollow();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const friend = friends.map((f) => f.id);
  const followers = followings !== null ? followings.map((f) => f.id) : [];
  console.log(followers.includes(loginUser.id));

  const handleClickFollow = () => {
    localStorage.setItem('followId', user._id);
    handleFollow();
  };

  return (
    <div className={styles.wrapper}>
      <Link to={`/main/profile/${user._id}`} className={styles.avatar}>
        <img
          src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
          alt={user.name}
        />
      </Link>
      <div className={styles.info}>
        <Link to={`/main/profile/${user._id}`}>{user.name}</Link>
        {friend.includes(user._id) || followers.includes(loginUser.id) ? (
          <AllReadyFriendsIcon className={styles.allReadyFriends} />
        ) : (
          <AddFriendIcon onClick={handleClickFollow} />
        )}
      </div>
    </div>
  );
});
