import React from 'react';
import styles from './ButtonFriend.module.scss';
import { Button } from '../Button/Button';
import { ReactComponent as AllReadyFriendsIcon } from '../../../helpers/icons/allreadyFriens.svg';
import { ReactComponent as ArrowDownIcon } from '../../../helpers/icons/arrowDown.svg';
import { useRequest } from '../../../hooks/useRequest';
import { useFollow } from '../../../hooks/useFollow';
import { useAppSelector } from '../../../hooks/redux';
import { ButtonFriendProps } from './ButtonFriend.props';

export const ButtonsFriend = ({ userId }: ButtonFriendProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const { friends, request, addFriend, deleteFromFriend } = useRequest();
  const { followings, handleFollow, handleUnfollow } = useFollow();

  const friendsDone = friends.map((friend) => friend.id);
  const requestsDone = request.map((request) => request.id);
  const followingDone = followings !== null ? followings.map((following) => following.id) : [];

  return (
    <>
      {!friendsDone.includes(userId!) ? (
        <div className={styles.follow}>
          {!followingDone.includes(userId!) && requestsDone.includes(userId!) ? (
            <Button appearance='primary' onClick={() => addFriend(userId!)}>
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
          <Button
            className={styles.allReadyFriends}
            appearance='primary'
            onClick={() => deleteFromFriend(userId!)}
          >
            <AllReadyFriendsIcon className={styles.allReadyIcon} />
            У вас в друзьях
            <ArrowDownIcon className={styles.arrowDown} />
          </Button>
        </div>
      )}
    </>
  );
};
