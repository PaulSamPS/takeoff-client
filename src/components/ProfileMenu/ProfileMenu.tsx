import React from 'react';
import styles from './ProfileMenu.module.scss';
import { ReactComponent as SettingsIcon } from '../../helpers/icons/settings.svg';
import { ReactComponent as ExitIcon } from '../../helpers/icons/exit.svg';
import { CustomLink } from '../UI/CustomLink/CustomLink';
import { SocketContext } from '../../helpers/context';
import { logout } from '../../redux/actions/authAction';
import { useAppDispatch } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { ProfileMenuType } from './ProfileMenu.type';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';

export const ProfileMenu = ({ setVisibleMenu, ...props }: ProfileMenuType): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setVisibleMenu(false));

  const handleLogout = () => {
    socket?.emit('logout');
    dispatch(logout());
    socket?.disconnect();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={styles.wrapper} ref={ref} {...props}>
      <CustomLink
        to={'/main/settings'}
        style={{ padding: '5px 10px' }}
        onClick={() => setVisibleMenu(false)}
      >
        <SettingsIcon />
        Настройки
      </CustomLink>
      <CustomLink to={'/'} style={{ padding: '5px 10px' }} onClick={handleLogout}>
        <ExitIcon />
        Выйти
      </CustomLink>
    </div>
  );
};
