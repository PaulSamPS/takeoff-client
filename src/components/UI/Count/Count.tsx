import React from 'react';
import { CountProps } from './Count.props';

import cn from 'classnames';

import styles from './Count.module.scss';

export const Count = ({ children, className, ...props }: CountProps) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {children}
    </div>
  );
};
