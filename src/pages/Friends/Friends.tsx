import React from 'react';
import styles from './Friiend.module.scss';
import { useRequest } from '../../hooks/useRequest';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import { FriendsAll } from '../FriendsAll/FriendsAll';
import { FriendsOnline } from '../FriendsOnline/FriendsOnline';

export const Friends = () => {
  const { friends } = useRequest();
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const [activeSort, setActiveSort] = React.useState<number>(0);
  const onlineFriends = friends.map((f) => f.id).toString();
  const countOnlineFriends = users.filter((user) => user.userId === onlineFriends).length;

  document.getElementById('input')?.focus();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div
          className={cn(styles.sort, {
            [styles.activeSort]: activeSort === 0,
          })}
          onClick={() => setActiveSort(0)}
        >
          Все друзья <span>{friends.length}</span>
        </div>
        <div
          className={cn(styles.sort, {
            [styles.activeSort]: activeSort === 1,
          })}
          onClick={() => setActiveSort(1)}
        >
          Друзья онлайн <span>{countOnlineFriends}</span>
        </div>
      </div>
      {activeSort === 0 ? <FriendsAll /> : <FriendsOnline />}
    </div>
  );
};
