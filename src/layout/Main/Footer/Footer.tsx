import React from 'react';
import { FooterType } from './Footer.type';
import styles from './Footer.module.scss';
import cn from 'classnames';

export const Footer = ({ className, ...props }: FooterType): JSX.Element => {
  return (
    <div className={cn(styles.container, className)} {...props}>
      <div className={styles.wrapper}>
        <h2>TakeOff</h2>
      </div>
    </div>
  );
};
