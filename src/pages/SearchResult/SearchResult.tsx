import React from 'react';
import { getUsers } from '../../redux/actions/usersAction';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export const SearchResult = (): JSX.Element => {
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getUsers());
  }, []);
  return <div></div>;
};
