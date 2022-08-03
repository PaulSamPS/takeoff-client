import React from 'react';
import { Search } from '../../../components/UI/Search/Search';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getUsers } from '../../../redux/actions/usersAction';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import styles from './FriendsFind.module.scss';
import { PeopleFindCard } from '../../../components/PeopleFindCard/PeopleFindCard';

export const FriendsFind = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users, isLoading } = useAppSelector((state) => state.usersReducer);
  const [search, setSearch] = React.useState<string | null>('');
  const dispatch = useAppDispatch();
  console.log(search);

  const usersWithoutLoginUser = users.filter((u) => u.id !== loginUser.id);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Search setText={setSearch} placeholder={'Введите запрос'} className={styles.search} />
      <div
        className={styles.grid}
        style={{
          display: isLoading || usersWithoutLoginUser.length <= 0 ? 'block' : 'grid',
          height: usersWithoutLoginUser.length > 0 ? 'fit-content' : 'calc(100vh - 216px)',
        }}
      >
        {!isLoading ? (
          users
            .filter((u) => u.id !== loginUser.id)
            .map((user) => <PeopleFindCard key={user.id} user={user} />)
        ) : (
          <Spinner />
        )}
        {usersWithoutLoginUser.length <= 0 && (
          <span className={styles.searchResult}>Ничего не найдено</span>
        )}
      </div>
    </div>
  );
};
