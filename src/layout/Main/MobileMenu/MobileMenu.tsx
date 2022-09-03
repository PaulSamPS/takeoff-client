import React from 'react';
import { MobileMenuType } from './MobileMenu.type';
import { useAppSelector } from '../../../hooks/redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../../helpers/icons/profile.svg';
import { ReactComponent as NewsIcon } from '../../../helpers/icons/news.svg';
import { ReactComponent as ChatIcon } from '../../../helpers/icons/chat.svg';
import { ReactComponent as FriendsIcon } from '../../../helpers/icons/friends.svg';

import styles from './MobileMenu.module.scss';

export const MobileMenu = ({ className, ...props }: MobileMenuType): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  return (
    <div className={styles.wrapper}>
      <Link to={`/main/profile/${loginUser.id}`}>
        <ProfileIcon />
      </Link>
      <Link to={'/main/news'}>
        <NewsIcon />
      </Link>
      <Link to={'/main/conversations'}>
        <ChatIcon />
      </Link>
      <Link to={'/main/friends'}>
        <FriendsIcon />
      </Link>
    </div>
  );
};
