import React, { MouseEvent } from 'react';
import styles from './MobileSidebar.module.scss';
import { MobileSidebarType } from '../../layout/Main/MobileHeader/MobileSidebar.type';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import { CustomLink } from '../UI';
import { ReactComponent as SettingsIcon } from '../../helpers/icons/settings.svg';
import { ReactComponent as ExitIcon } from '../../helpers/icons/exit.svg';
import { logout } from '../../redux/actions/authAction';
import { SocketContext } from '../../helpers/socketContext';
import { Link, useNavigate } from 'react-router-dom';

export const MobileSidebar = ({ setModal, modal }: MobileSidebarType) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };

  const variantsOverlay = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const handleLogout = () => {
    socket?.emit('logout');
    dispatch(logout());
    socket?.disconnect();
    navigate('/');
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className={styles.overlay}
          onClick={() => setModal(false)}
          animate={modal ? 'open' : 'closed'}
          variants={variantsOverlay}
          exit={'closed'}
          initial={'closed'}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div
            className={styles.menu}
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            animate={modal ? 'open' : 'closed'}
            variants={variants}
            initial={'closed'}
            exit={'closed'}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <Link to={'/main/news'} className={styles.logo} onClick={() => setModal(false)}>
              <h2>TakeOff</h2>
            </Link>
            <Link
              to={`/main/profile/${loginUser.id}`}
              className={styles.avatar}
              onClick={() => setModal(false)}
            >
              <img
                src={
                  loginUser.avatar == null ? `/photo.png` : `${API_URL}/avatar/${loginUser.avatar}`
                }
                alt={loginUser.name.firstName + ' ' + loginUser.name.lastName}
              />
            </Link>
            <div className={styles.profileMenu}>
              <CustomLink
                to={'/main/settings'}
                style={{ padding: '5px 10px' }}
                onClick={() => setModal(false)}
              >
                <SettingsIcon />
                Настройки
              </CustomLink>
              <CustomLink to={'/'} style={{ padding: '5px 10px' }} onClick={handleLogout}>
                <ExitIcon />
                Выйти
              </CustomLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
