import React from 'react';
import styles from './Main.module.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../components/User/User';
import { getUsers } from '../redux/actions/usersAction';
import { useLocation } from 'react-router-dom';

export const Main = (): JSX.Element => {
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log(location.pathname);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={styles.wrapper}>
      {users
        .filter((user) => {
          return user.role != 'admin';
        })
        .map((user) => (
          <User key={user.id} user={user} />
        ))}
    </div>
  );
};
