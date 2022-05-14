import React, { ChangeEvent } from 'react';
import { SearchProps } from './Search.props';
import { Input } from '../Input/Input';
import { ReactComponent as SearchIcon } from '../../helpers/icons/search.svg';
import cn from 'classnames';
import styles from './Search.module.scss';

export const Search = ({ search, setSearch, className, ...props }: SearchProps): JSX.Element => {
  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        className={styles.input}
        placeholder='Поиск...'
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <SearchIcon className={styles.icon} />
    </div>
  );
};
