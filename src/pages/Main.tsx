import React from 'react';
import styles from './Main.module.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../components/User/User';
import { getUsers } from '../redux/actions/usersAction';

export const Main = (): JSX.Element => {
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={styles.wrapper}>
      {users.map((u) => (
        <User key={u.id} user={u} />
      ))}
    </div>
  );
};
