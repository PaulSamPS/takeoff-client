import React from 'react';
import styles from './RightBar.module.scss';
import { CustomLink } from '../CustomLink/CustomLink';
import { Count } from '../Count/Count';
import { RightBarProps } from './RightBar.props';
import { useScroll } from '../../hooks/usseScroll';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ReactComponent as CloseIcon } from '../../helpers/icons/close.svg';
import { deleteChat } from '../../redux/reducers/openChatReducer';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

export const RightBar = ({
  totalUnviewed,
  firstItem,
  secondItem,
  firstItemLink,
  secondItemLink,
  thirdItemLink,
  thirdItem,
  isFixed,
  queryFirst,
  querySecond,
}: RightBarProps): JSX.Element => {
  const { scrollY } = useScroll();
  const { openChat } = useAppSelector((state) => state.openChatReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const handleDeleteChat = (chatId: string) => {
    dispatch(deleteChat(chatId));
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        position: !isFixed ? (scrollY >= 20 ? 'sticky' : 'relative') : 'sticky',
        top: !isFixed ? (scrollY >= 20 ? '71px' : '0') : '91px',
      }}
    >
      <CustomLink
        to={firstItemLink}
        appearance='rightMenu'
        className={cn({ [styles.activeRightBar]: queryFirst })}
      >
        {firstItem}
      </CustomLink>
      <CustomLink
        to={secondItemLink}
        appearance='rightMenu'
        className={cn({ [styles.activeRightBar]: querySecond })}
      >
        {secondItem} {totalUnviewed! > 0 && <Count className={styles.count}>{totalUnviewed}</Count>}
      </CustomLink>
      {thirdItemLink && (
        <CustomLink to={thirdItemLink} appearance='rightMenu'>
          {thirdItem}
        </CustomLink>
      )}
      {openChat.length > 0 && isFixed && <hr />}
      {openChat.length > 0 &&
        isFixed &&
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
};
