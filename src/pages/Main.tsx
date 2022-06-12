import React from 'react';
import styles from './Main.module.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../components/User/User';
import { getUsers } from '../redux/actions/usersAction';
import { Spinner } from '../components/Spinner/Spinner';
import { IUserAll } from '../interfaces/user.interface';

export const Main = (): JSX.Element => {
  const { users, isLoading } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('AccessToken')) {
      // dispatch(refreshToken()).then(() => {
      dispatch(getUsers());
      // });
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      {users.map((user: IUserAll) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
};
