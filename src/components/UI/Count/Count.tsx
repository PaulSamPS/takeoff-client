import React from 'react';
import styles from './Count.module.scss';
import { CountProps } from './Count.props';
import cn from 'classnames';

export const Count = ({ children, className, ...props }: CountProps) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {children}
    </div>
  );
};
