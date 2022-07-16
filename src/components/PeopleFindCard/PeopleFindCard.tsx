import React from 'react';
import { API_URL } from '../../http/axios';
import styles from './PeopleFindCard.module.scss';
import { Link } from 'react-router-dom';
import { PeopleFindCardProps } from './PeopleFindCard.props';
import { ReactComponent as AddFriendIcon } from '../../helpers/icons/addFriend.svg';
import { ReactComponent as AllReadyFriendsIcon } from '../../helpers/icons/done.svg';
import { useRequest } from '../../hooks/useRequest';

export const PeopleFindCard = React.memo(({ user }: PeopleFindCardProps): JSX.Element => {
  const { friends } = useRequest();
  const friend = friends.map((f) => f.id);

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
        {friend.includes(user._id) ? (
          <AllReadyFriendsIcon className={styles.allReadyFriends} />
        ) : (
          <AddFriendIcon />
        )}
      </div>
    </div>
  );
});
