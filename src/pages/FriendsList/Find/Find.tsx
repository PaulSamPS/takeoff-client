import React, { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getUsers } from '../../../redux/actions/usersAction';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import styles from './Find.module.scss';
import { PeopleFindCard } from '../../../components/PeopleFindCard/PeopleFindCard';
import debounce from 'lodash.debounce';
import { Search } from '../../../components/UI/Search/Search';

export const FriendsListFind = (): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users, isLoading } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();

  const [search, setSearch] = React.useState<string>('');
  const [isLoadingSearchUsers, setIsLoadingSearchUsers] = React.useState<boolean>(false);

  const usersWithoutLoginUser = users.filter((u) => u.id !== loginUser.id);

  const searchDebounce = React.useCallback(
    debounce(async (userName: string) => {
      await dispatch(getUsers(userName));
      setIsLoadingSearchUsers(false);
    }, 500),
    []
  );

  const handleSearch = (e: FormEvent<HTMLDivElement>) => {
    setIsLoadingSearchUsers(true);
    setSearch(e.currentTarget.textContent!.toString());
    searchDebounce(e.currentTarget.textContent!.toString());
  };

  React.useEffect(() => {
    if (search.length <= 0) {
      dispatch(getUsers(search!));
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Search placeholder='Введите запрос' className={styles.search} onInput={handleSearch} />
      {isLoading || isLoadingSearchUsers ? (
        <Spinner />
      ) : (
        <>
          {usersWithoutLoginUser.length > 0 ? (
            <div className={styles.grid}>
              {users
                .filter((u) => u.id !== loginUser.id)
                .map((user) => (
                  <PeopleFindCard key={user.id} user={user} />
                ))}
            </div>
          ) : (
            <span className={styles.searchResult}>Ничего не найдено</span>
          )}
        </>
      )}
    </div>
  );
};
