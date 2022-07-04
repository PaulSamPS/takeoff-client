import React from 'react';
import { API_URL } from '../../http/axios';
import styles from './PeopleFindCard.module.scss';
import { Link } from 'react-router-dom';
import { PeopleFindCardProps } from './PeopleFindCard.props';
import { ReactComponent as AddFriend } from '../../helpers/icons/addFriend.svg';

export const PeopleFindCard = React.memo(({ user }: PeopleFindCardProps): JSX.Element => {
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
        <AddFriend />
      </div>
    </div>
  );
});
