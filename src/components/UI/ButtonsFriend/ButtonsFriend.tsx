import React from 'react';
import styles from './ButtonFriend.module.scss';
import { Button } from '../Button/Button';
import { ReactComponent as AllReadyFriendsIcon } from '../../../helpers/icons/allreadyFriens.svg';
import { ReactComponent as ArrowDownIcon } from '../../../helpers/icons/arrowDown.svg';
import { useRequest } from '../../../hooks/useRequest';
import { useFollow } from '../../../hooks/useFollow';
import { useAppSelector } from '../../../hooks/redux';
import { ButtonFriendProps } from './ButtonFriend.props';

export const ButtonsFriend = ({ id }: ButtonFriendProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { friends, request, addFriend } = useRequest();
  const { followings, handleFollow, handleUnfollow } = useFollow();
  const friendsDone = friends.map((friend) => friend.id);
  const requestsDone = request.map((request) => request.id);
  const followingDone = followings !== null ? followings.map((following) => following.id) : [];

  return (
    <>
      {!friendsDone.includes(id!) ? (
        <div className={styles.follow}>
          {!followingDone.includes(id!) && requestsDone.includes(id!) ? (
            <Button appearance='primary' onClick={() => addFriend(id!)}>
              Добавить в друзья
            </Button>
          ) : followingDone.includes(loginUser.id) ? (
            <Button appearance='primary' onClick={handleUnfollow}>
              Отписаться
            </Button>
          ) : (
            <Button appearance='primary' onClick={handleFollow}>
              Подписаться
            </Button>
          )}
        </div>
      ) : (
        <div className={styles.follow}>
          <Button className={styles.allReadyFriends} appearance='primary'>
            <AllReadyFriendsIcon className={styles.allReadyIcon} />
            У вас в друзьях
            <ArrowDownIcon className={styles.arrowDown} />
          </Button>
        </div>
      )}
    </>
  );
};
