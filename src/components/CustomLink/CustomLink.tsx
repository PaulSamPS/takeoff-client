import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { CustomLinkProps } from './CustomLink.props';
import cn from 'classnames';
import styles from './CustomLink.module.scss';

export const CustomLink = ({
  appearance,
  children,
  className,
  to,
  ...props
}: CustomLinkProps): JSX.Element => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      className={cn(styles.link, className, {
        [styles.active]: match,
        [styles.rightMenu]: appearance === 'rightMenu',
        [styles.activeRightBar]: appearance === 'rightMenu' && match,
      })}
      {...props}
    >
      {children}
    </Link>
  );
};
