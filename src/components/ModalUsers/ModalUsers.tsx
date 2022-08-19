import React from 'react';
import { API_URL } from '../../http/axios';
import { Link } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest';
import { ModalUserProps } from './ModalUser.props';
import { useFollow } from '../../hooks/useFollow';

import cn from 'classnames';

import styles from './ModalUsers.module.scss';

export const ModalUsers = ({
  activeIndex,
  setActiveIndex,
  setFriendsModal,
}: ModalUserProps): JSX.Element => {
  const { friendsUserInfo } = useRequest();
  const { followings } = useFollow();

  const handleClickCloseModal = () => {
    setFriendsModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <span
          className={cn({ [styles.active]: activeIndex === 0 })}
          onClick={() => setActiveIndex(0)}
        >
          {'Подписчики' + ' ' + followings.length}
        </span>
        <span
          className={cn({ [styles.active]: activeIndex === 1 })}
          onClick={() => setActiveIndex(1)}
        >
          {'Друзья' + ' ' + friendsUserInfo.length}
        </span>
      </div>
      <div className={styles.usersList}>
        {activeIndex === 0 &&
          followings.map((following) => (
            <div key={following.id} className={styles.user}>
              <Link
                to={`/main/profile/${following.id}`}
                className={styles.avatar}
                onClick={handleClickCloseModal}
              >
                <img
                  src={
                    following.avatar == null
                      ? `/photo.png`
                      : `${API_URL}/avatar/${following.avatar}`
                  }
                  alt={following.name.firstName + '' + following.name.lastName}
                />
              </Link>
              <Link
                to={`/main/profile/${following.id}`}
                className={styles.name}
                onClick={handleClickCloseModal}
              >
                <span>{following.name.firstName}</span>
                <span>{following.name.lastName}</span>
              </Link>
            </div>
          ))}
        {activeIndex === 1 &&
          friendsUserInfo.map((friend) => (
            <div key={friend.id} className={styles.user}>
              <Link
                to={`/main/profile/${friend.id}`}
                className={styles.avatar}
                onClick={handleClickCloseModal}
              >
                <img
                  src={friend.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend.avatar}`}
                  alt={friend.name.firstName + '' + friend.name.lastName}
                />
              </Link>
              <Link
                to={`/main/profile/${friend.id}`}
                className={styles.name}
                onClick={handleClickCloseModal}
              >
                <span>{friend.name.firstName}</span>
                <span>{friend.name.lastName}</span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
