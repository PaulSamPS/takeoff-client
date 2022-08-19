import React from 'react';
import { FooterType } from './Footer.type';

import cn from 'classnames';

import styles from './Footer.module.scss';

export const Footer = ({ className, ...props }: FooterType): JSX.Element => {
  return (
    <div className={cn(styles.container, className)} {...props}>
      <div className={styles.wrapper}>
        <span>© {new Date().getFullYear()} Copyright TakeOff</span>
      </div>
    </div>
  );
};
