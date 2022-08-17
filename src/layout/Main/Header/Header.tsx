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
import debounce from 'lodash.debounce';
import { usersReducer } from '../../../redux/reducers/usersReducer';
import { AxiosResponse } from 'axios';
import { IUser } from '../../../interfaces/user.interface';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { useOnClickOutside } from '../../../hooks/useOnclickOutside';

export const Header = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { searchUsers } = useAppSelector((state) => state.usersReducer);

  const dispatch = useAppDispatch();

  const [visibleMenu, setVisibleMenu] = React.useState<boolean>(false);
  const [visibleNotification, setVisibleNotification] = React.useState<boolean>(false);
  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>('');
  const [isLoadingSearchUsers, setIsLoadingSearchUsers] = React.useState<boolean>(false);

  const searchRef = React.useRef<HTMLDivElement>(null);

  const { notificationsCount, handleReadNotifications } = useNotifications();
  useOnClickOutside(searchRef, () => setIsSearch(false));

  const handleOpenNotifications = () => {
    setVisibleNotification(true);
    handleReadNotifications();
  };

  const visibleSearch = () => {
    setIsSearch(true);
  };

  const searchDebounce = React.useCallback(
    debounce(async (userName: string) => {
      await $apiAuth
        .post(`api/user/search`, { name: userName })
        .then((res: AxiosResponse<IUser[]>) => {
          dispatch(usersReducer.actions.setSearchUsers(res.data));
          setIsLoadingSearchUsers(false);
          setIsSearch(true);
        });
    }, 500),
    []
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoadingSearchUsers(true);
    setSearch(e.target.value);
    searchDebounce(e.target.value);
  };

  const handleOnHover = (userId: string) => {
    localStorage.setItem('followId', userId);
    localStorage.setItem('friendsUserInfo', userId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to={'/main/news'} className={styles.logo}>
          <h2>TakeOff</h2>
        </Link>
        <div className={styles.search} ref={searchRef}>
          <Input
            placeholder='Поиск'
            onChange={handleSearch}
            value={search}
            onClick={visibleSearch}
          />
          <SearchIcon />
          {isSearch && (
            <div className={styles.searchUsers}>
              {isLoadingSearchUsers ? (
                <Spinner className={styles.spinner} />
              ) : searchUsers.length > 0 ? (
                searchUsers.map((people) => (
                  <div key={people.id} className={styles.user}>
                    <Link to={`/main/profile/${people.id}`} replace className={styles.avatar}>
                      <img
                        src={
                          people.avatar == null
                            ? `/photo.png`
                            : `${API_URL}/avatar/${people.avatar}`
                        }
                        alt={people.name.firstName + ' ' + people.name.lastName}
                        onClick={() => setIsSearch(false)}
                      />
                    </Link>
                    <div
                      className={styles.userInfo}
                      onMouseEnter={() => handleOnHover(people.id)}
                      onClick={() => setIsSearch(false)}
                    >
                      <Link to={`/main/profile/${people.id}`} replace className={styles.userName}>
                        {people.name.firstName + ' ' + people.name.lastName}
                      </Link>
                      <span>{people.bio.city}</span>
                    </div>
                  </div>
                ))
              ) : (
                <span className={styles.notFound}>Ничего не найдено</span>
              )}
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
