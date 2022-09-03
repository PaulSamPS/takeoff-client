import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './MobileHeader.module.scss';
import { ReactComponent as BurgerIcon } from '../../../helpers/icons/burger.svg';
import cn from 'classnames';

export const MobileHeader: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <BurgerIcon />
    </div>
  );
};
