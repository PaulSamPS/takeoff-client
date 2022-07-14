import React from 'react';
import styles from './Friendslist.module.scss';
import { useRequest } from '../../hooks/useRequest';
import { RightBar } from '../../components/RightBar/RightBar';
import { Friends } from './Friends/Friends';
import { FriendsRequests } from './FriendsRequests/FriendsRequests';
import { FriendsFind } from './FriendsFind/FriendsFind';
import { useNavigate } from 'react-router-dom';

export const FriendsList = () => {
  const { request } = useRequest();
  const queryParams = new URLSearchParams(location.search);
  const friendsAll = queryParams.get('all');
  const requestsFriends = queryParams.get('requests');
  const findPeople = queryParams.get('find');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/friends') {
      navigate({ search: '?all=get' });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {friendsAll === 'get' && <Friends />}
      {requestsFriends && <FriendsRequests />}
      {findPeople && <FriendsFind />}
      <RightBar
        totalUnviewed={request.length}
        firstItem={'Мои друзья'}
        secondItem={'Заявки в друзья'}
        thirdItem={'Поиск друзей'}
        firstItemLink={'/friends?all=get'}
        secondItemLink={'/friends?requests=get'}
        thirdItemLink={'/friends?find=people'}
        queryFirst={friendsAll}
        querySecond={requestsFriends}
        queryThird={findPeople}
      />
    </div>
  );
};
