import React, { FormEvent } from 'react';
import { SearchProps } from './Search.props';
import { ReactComponent as SearchIcon } from '../../../helpers/icons/search.svg';
import styles from './Search.module.scss';
import { Button } from '../Button/Button';
import { useScroll } from '../../../hooks/usseScroll';
import cn from 'classnames';

export const Search = ({ setText, placeholder, className, ...props }: SearchProps): JSX.Element => {
  const { scrollY } = useScroll();

  return (
    <div
      className={cn(styles.wrapper, className)}
      style={{
        position: scrollY >= 75 ? 'sticky' : 'relative',
        top: scrollY >= 75 ? '71px' : '0',
        zIndex: scrollY >= 75 ? '11' : '0',
      }}
      {...props}
    >
      <div
        className={styles.input}
        id='input'
        contentEditable='true'
        placeholder={placeholder}
        role='textbox'
        aria-multiline='true'
        onInput={(e: FormEvent<HTMLDivElement>) =>
          e.currentTarget.textContent !== null && setText(e.currentTarget.textContent.toString())
        }
      ></div>
      <Button appearance='primary' disabled={true}>
        <SearchIcon />
      </Button>
    </div>
  );
};
