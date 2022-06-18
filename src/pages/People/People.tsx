import React from 'react';
import { Search } from '../../components/Search/Search';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUsers } from '../../redux/actions/usersAction';
import { Spinner } from '../../components/Spinner/Spinner';
import { useChat } from '../../hooks/useChat';
import { User } from '../../components/User/User';
import styles from './People.module.scss';

export const People = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const allUsers = useAppSelector((state) => state.usersReducer);
  const [search, setSearch] = React.useState<string>('');
  const { users } = useChat();
  const dispatch = useAppDispatch();

  const filteredUsers = React.useMemo(() => {
    if (search.length < 2) {
      return allUsers.users;
    }
    return allUsers.users.filter((chat) => {
      return chat.name.toLocaleLowerCase().search(search.toLocaleLowerCase()) !== -1;
    });
  }, [search, users]);

  React.useEffect(() => {
    if (localStorage.getItem('AccessToken')) {
      // dispatch(refreshToken()).then(() => {
      dispatch(getUsers());
      // });
    }
  }, []);

  if (allUsers.isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.wrapper}>
      <Search setSearch={setSearch} search={search} />
      {filteredUsers
        .filter((u) => u._id !== user.id)
        .map((user) => (
          <User key={user._id} user={user} />
        ))}
      {filteredUsers.length <= 0 && <h3 className={styles.searchResult}>Ничего не найдено</h3>}
    </div>
  );
};
