import React from 'react';
import styles from './RightBar.module.scss';
import { CustomLink } from '../CustomLink/CustomLink';
import { Count } from '../Count/Count';
import { RightBarProps } from './RightBar.props';
import { useScroll } from '../../hooks/usseScroll';
import { useAppSelector } from '../../hooks/redux';

export const RightBar = ({
  arr,
  firstItem,
  secondItem,
  firstItemLink,
  secondItemLink,
}: RightBarProps): JSX.Element => {
  const { scrollY } = useScroll();
  const { openChat } = useAppSelector((state) => state.openChatReducer);

  return (
    <div
      className={styles.wrapper}
      style={{
        position: scrollY >= 20 ? 'sticky' : 'relative',
        top: scrollY >= 20 ? '71px' : '0',
      }}
    >
      <CustomLink to={firstItemLink} appearance='rightMenu'>
        {firstItem}
      </CustomLink>
      <CustomLink
        to={secondItemLink}
        appearance='rightMenu'
        style={{ borderBottom: openChat.length > 0 ? '1px solid var(--borderColor)' : 'none' }}
      >
        {secondItem} {arr.length > 0 && <Count className={styles.count}>{arr.length}</Count>}
      </CustomLink>
      {openChat.length > 0 &&
        openChat.map((c) => (
          <CustomLink to={c.link} key={c.link} appearance='rightMenu'>
            {c.name}
          </CustomLink>
        ))}
    </div>
  );
};
