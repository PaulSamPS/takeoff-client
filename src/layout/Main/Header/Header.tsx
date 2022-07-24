import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../http/axios';
import { ReactComponent as ArrowDownIcon } from '../../../helpers/icons/arrowDown.svg';
import { ProfileMenu } from '../../../components/ProfileMenu/ProfileMenu';

export const Header = () => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [visibleMenu, setVisibleMenu] = React.useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to={'/main/news'} className={styles.logo}>
          <h2>TakeOff</h2>
        </Link>
        <div className={styles.profile} onClick={() => setVisibleMenu(true)}>
          <img
            src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
            alt={user.firstName + ' ' + user.lastName}
          />
          <ArrowDownIcon />
          {visibleMenu && (
            <ProfileMenu onClick={(e) => e.stopPropagation()} setVisibleMenu={setVisibleMenu} />
          )}
        </div>
      </div>
    </div>
  );
};
