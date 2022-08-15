import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { $apiAuth, API_URL } from '../../../http/axios';
import { ReactComponent as ArrowDownIcon } from '../../../helpers/icons/arrowDown.svg';
import { ReactComponent as NotificationIcon } from '../../../helpers/icons/notification.svg';
import { ReactComponent as SearchIcon } from '../../../helpers/icons/search.svg';
import { ProfileMenu } from '../../../components/ProfileMenu/ProfileMenu';
import { Count } from '../../../components/Count/Count';
import { NotificationList } from '../../../components/NotificationList/NotificationList';
import { Input } from '../../../components/UI/Input/Input';
import cn from 'classnames';
import { useNotifications } from '../../../hooks/useNotifications';
import { useRequest } from '../../../hooks/useRequest';
import debounce from 'lodash.debounce';
import { usersReducer } from '../../../redux/reducers/usersReducer';
import { AxiosResponse } from 'axios';
import { IUser } from '../../../interfaces/user.interface';

export const Header = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { searchUsers } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  console.log('searchAct', searchUsers);

  const [visibleMenu, setVisibleMenu] = React.useState<boolean>(false);
  const [visibleNotification, setVisibleNotification] = React.useState<boolean>(false);
  const [isSearch] = React.useState<boolean>(true);
  const [text, setText] = React.useState<string>('');
  const { notificationsCount, handleReadNotifications } = useNotifications();
  const { friends } = useRequest();

  const handleOpenNotifications = () => {
    setVisibleNotification(true);
    handleReadNotifications();
  };

  const filteredFriends = friends.filter((friend) =>
    (friend.name.firstName.toLowerCase() + '' + friend.name.lastName.toLowerCase()).includes(
      text?.toLowerCase()
    )
  );

  console.log(friends, searchUsers);

  const searchPeople = filteredFriends.length > 0 ? filteredFriends : searchUsers;

  // const throttleGetUsers = async () => {
  //   await $apiAuth.post(`api/user/search`, { name: text }).then((res: AxiosResponse<IUser[]>) => {
  //     dispatch(usersReducer.actions.getSearchUsers(res.data));
  //   });
  // };

  const testDebounce = React.useCallback(
    debounce(async (userName: string) => {
      await $apiAuth
        .post(`api/user/search`, { name: userName })
        .then((res: AxiosResponse<IUser[]>) => {
          dispatch(usersReducer.actions.getSearchUsers(res.data));
        });
    }, 1000),
    []
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    testDebounce(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to={'/main/news'} className={styles.logo}>
          <h2>TakeOff</h2>
        </Link>
        <div className={styles.search}>
          <Input placeholder='Поиск' onChange={handleSearch} value={text} />
          <SearchIcon />
          {isSearch && (
            <div className={styles.searchUsers}>
              {searchPeople.map((people) => (
                <div key={people.id} className={styles.user}>
                  <Link to={`/main/profile/${people.id}`} replace className={styles.avatar}>
                    <img
                      src={
                        people.avatar == null ? `/photo.png` : `${API_URL}/avatar/${people.avatar}`
                      }
                      alt={people.name.firstName + ' ' + people.name.lastName}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.notification} onClick={handleOpenNotifications}>
          <div className={cn(styles.icon, { [styles.notificationVisible]: visibleNotification })}>
            <NotificationIcon />
          </div>
          {notificationsCount > 0 && <Count className={styles.count}>{notificationsCount}</Count>}
          {visibleNotification && (
            <NotificationList setVisibleNotification={setVisibleNotification} />
          )}
        </div>
        <div
          className={cn(styles.profile, { [styles.profileMenuVisible]: visibleMenu })}
          onClick={() => setVisibleMenu(true)}
        >
          <img
            src={loginUser.avatar == null ? `/photo.png` : `${API_URL}/avatar/${loginUser.avatar}`}
            alt={loginUser.name.firstName + ' ' + loginUser.name.lastName}
          />
          <ArrowDownIcon />
          {visibleMenu && (
            <ProfileMenu onClick={(e) => e.stopPropagation()} setVisibleMenu={setVisibleMenu} />
          )}
        </div>
      </div>
    </div>
  );
};
