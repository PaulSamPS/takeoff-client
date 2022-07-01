import React from 'react';
import styles from './RightBar.module.scss';
import { CustomLink } from '../CustomLink/CustomLink';
import { Count } from '../Count/Count';
import { RightBarProps } from './RightBar.props';
import { useScroll } from '../../hooks/usseScroll';

export const RightBar = ({ arr, firstItem, secondItem }: RightBarProps): JSX.Element => {
  const { scrollY } = useScroll();

  return (
    <div
      className={styles.wrapper}
      style={{
        position: scrollY >= 20 ? 'sticky' : 'relative',
        top: scrollY >= 20 ? '71px' : '0',
      }}
    >
      <CustomLink to={'/main/friends'} appearance='rightMenu'>
        {firstItem}
      </CustomLink>
      <CustomLink to={'/main/friends/requests'} appearance='rightMenu'>
        {secondItem} {arr.length > 0 && <Count className={styles.count}>{arr.length}</Count>}
      </CustomLink>
    </div>
  );
};
