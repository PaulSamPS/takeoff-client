import React, { memo } from 'react';
import { CustomLink, Count } from '../UI';
import { RightBarProps } from './RightBar.props';
import { useScroll } from '../../hooks/useScroll';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ReactComponent as CloseIcon } from '../../helpers/icons/close.svg';
import { deleteChat } from '../../redux/reducers/openChatReducer';
import { Link, useParams } from 'react-router-dom';

import styles from './RightBar.module.scss';
import cn from 'classnames';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export const RightBar = memo(
  ({
    totalUnviewed,
    firstItem,
    secondItem,
    firstItemLink,
    secondItemLink,
    thirdItemLink,
    thirdItem,
    isFixed,
    className,
  }: RightBarProps): JSX.Element => {
    const { openChat } = useAppSelector((state) => state.openChatReducer);
    const dispatch = useAppDispatch();

    const { scrollY } = useScroll();
    const { id } = useParams();
    const { screenWidth } = useScreenWidth();

    const handleDeleteChat = (chatId: string) => {
      dispatch(deleteChat(chatId));
    };

    return (
      <div
        className={cn(styles.wrapper, className)}
        style={{
          position: !isFixed ? (scrollY >= 20 ? 'sticky' : 'relative') : 'sticky',
          top: !isFixed ? (scrollY >= 20 ? '49px' : '0') : '70px',
        }}
      >
        <CustomLink to={firstItemLink} appearance='rightMenu'>
          {firstItem}
        </CustomLink>
        <CustomLink to={secondItemLink} appearance='rightMenu'>
          {secondItem}{' '}
          {totalUnviewed! > 0 && <Count className={styles.count}>{totalUnviewed}</Count>}
        </CustomLink>
        {thirdItemLink && (
          <CustomLink to={thirdItemLink} appearance='rightMenu'>
            {thirdItem}
          </CustomLink>
        )}
        {openChat.length > 0 && isFixed && screenWidth > 1000 && <hr />}
        {openChat.length > 0 &&
          isFixed &&
          screenWidth > 1000 &&
          openChat.map((c) => (
            <div key={c.id} className={styles.item}>
              <CustomLink to={c.link} appearance='rightMenu' className={styles.chatLink}>
                {c.name}
              </CustomLink>
              <Link
                to={id === c.id ? '/main/conversations' : ''}
                onClick={() => handleDeleteChat(c.id)}
              >
                <CloseIcon />
              </Link>
            </div>
          ))}
      </div>
    );
  }
);
