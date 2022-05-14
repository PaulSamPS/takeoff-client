import React from 'react';
import styles from './Main.module.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../components/User/User';
import { getUsers } from '../redux/actions/usersAction';
import { Spinner } from '../components/Spinner/Spinner';
import { Search } from '../components/Search/Search';

export const Main = (): JSX.Element => {
  const { users, isLoading } = useAppSelector((state) => state.usersReducer);
  const [search, setSearch] = React.useState<string>('');
  const dispatch = useAppDispatch();

  const filteredUsers = users.filter((user) => {
    if (search.length > 2) {
      return user.name.toLocaleLowerCase().search(search.toLocaleLowerCase()) !== -1;
    } else {
      return users;
    }
  });

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <Search setSearch={setSearch} search={search} />
      {filteredUsers.map((user) => (
        <User key={user.id} user={user} />
      ))}
      {filteredUsers.length == 0 && <h3 className={styles.searchResult}>Ничего не найдено</h3>}
    </div>
  );
};
