import React from 'react';
import { Search } from '../../components/Search/Search';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUsers } from '../../redux/actions/usersAction';
import { Spinner } from '../../components/Spinner/Spinner';
import { User } from '../../components/User/User';
import styles from './People.module.scss';

export const People = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const { users, isLoading } = useAppSelector((state) => state.usersReducer);
  const [search, setSearch] = React.useState<string>('');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // dispatch(refreshToken()).then(() => {
    dispatch(getUsers());
    // });
  }, []);

  // const filteredUsers = React.useMemo(() => {
  //   if (search.length < 2) {
  //     return users;
  //   } else {
  //     return users.filter((chat) => {
  //       return chat.name.toLocaleLowerCase().search(search.toLocaleLowerCase()) !== -1;
  //     });
  //   }
  // }, [search]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.wrapper}>
      <Search setSearch={setSearch} search={search} />
      {users
        .filter((u) => u._id !== user.id)
        .map((user) => (
          <User key={user._id} user={user} />
        ))}
      {users.length <= 0 && <h3 className={styles.searchResult}>Ничего не найдено</h3>}
    </div>
  );
};
