import React, { ChangeEvent } from 'react';
import { Input, Spinner } from '../../../../components/UI';
import { ReactComponent as SearchIcon } from '../../../../helpers/icons/search.svg';
import { Link } from 'react-router-dom';
import { $apiAuth, API_URL } from '../../../../http/axios';
import { AxiosResponse } from 'axios';
import { IUser } from '../../../../interfaces/user.interface';
import { usersReducer } from '../../../../redux/reducers/usersReducer';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { useOnClickOutside } from '../../../../hooks/useOnclickOutside';
import { SearchProps } from '../../../../components/UI/Search/Search.props';

import debounce from 'lodash.debounce';
import cn from 'classnames';

import styles from './Search.module.scss';

export const Search = ({ className }: SearchProps) => {
  const { searchUsers } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();

  const [search, setSearch] = React.useState<string>('');
  const [isLoadingSearchUsers, setIsLoadingSearchUsers] = React.useState<boolean>(false);
  const [isSearch, setIsSearch] = React.useState<boolean>(false);

  const searchRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef, () => setIsSearch(false));

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
    <div className={cn(styles.search, className)} ref={searchRef}>
      <Input placeholder='Поиск' onChange={handleSearch} value={search} onClick={visibleSearch} />
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
                      people.avatar == null ? `/photo.png` : `${API_URL}/avatar/${people.avatar}`
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
  );
};
