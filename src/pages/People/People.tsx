import React from 'react';
import { Search } from '../../components/Search/Search';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUsers } from '../../redux/actions/usersAction';
import { Spinner } from '../../components/Spinner/Spinner';
import styles from './People.module.scss';
import { PeopleFindCard } from '../../components/PeopleFindCard/PeopleFindCard';

export const People = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const { users, isLoading } = useAppSelector((state) => state.usersReducer);
  const [search, setSearch] = React.useState<string | null>('');
  const dispatch = useAppDispatch();
  console.log(search);

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
      <Search setText={setSearch} placeholder={'Введите запрос'} className={styles.search} />
      <div className={styles.grid}>
        {users
          .filter((u) => u._id !== user.id)
          .map((user) => (
            <PeopleFindCard key={user._id} user={user} />
          ))}
      </div>
      {users.length <= 0 && <h3 className={styles.searchResult}>Ничего не найдено</h3>}
    </div>
  );
};
