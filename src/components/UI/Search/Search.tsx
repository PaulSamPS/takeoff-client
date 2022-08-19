import React, { ForwardedRef, forwardRef } from 'react';
import { SearchProps } from './Search.props';
import { ReactComponent as SearchIcon } from '../../../helpers/icons/search.svg';
import { Button } from '../Button/Button';
import { useScroll } from '../../../hooks/useScroll';

import cn from 'classnames';

import styles from './Search.module.scss';

export const Search = forwardRef(
  (
    { placeholder, className, ...props }: SearchProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { scrollY } = useScroll();

    return (
      <div
        className={cn(styles.wrapper, className)}
        style={{
          position: scrollY >= 51 ? 'sticky' : 'relative',
          top: scrollY >= 51 ? '49px' : '0',
          zIndex: scrollY >= 51 ? '11' : '0',
        }}
        {...props}
      >
        <div
          ref={ref}
          className={styles.input}
          id='input'
          contentEditable='true'
          placeholder={placeholder}
          role='textbox'
          aria-multiline='true'
        ></div>
        <Button appearance='primary' disabled={true}>
          <SearchIcon />
        </Button>
      </div>
    );
  }
);
