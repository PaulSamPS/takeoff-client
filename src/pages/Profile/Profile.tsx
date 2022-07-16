import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import styles from './Profile.module.scss';
import { calculateTime } from '../../helpers/calculateTime';
import { Button } from '../../components/Button/Button';
import { motion } from 'framer-motion';
import { ReactComponent as AddAvatar } from '../../helpers/icons/addAvatar.svg';
import { Modal } from '../../components/Modal/Modal';
import { ChangeAvatar } from '../../components/ChangeAvatar/ChangeAvatar';
import { IUser, IUserAll } from '../../interfaces/user.interface';
import { SocketContext } from '../../helpers/context';
import { useParams } from 'react-router-dom';

interface IUserInfo {
  user: IUserAll;
}

export const Profile = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const { id } = useParams();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const [avatarModal, setAvatarModal] = React.useState<boolean>(false);
  const usersOnline = users.map((user: any) => user.userId);
  const [hover, setHover] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUserAll | IUser>();

  const variantsModal = {
    open: { opacity: 1, height: '20%' },
    closed: { opacity: 0, height: 0 },
  };

  React.useEffect(() => {
    socket?.emit('userInfo:get', { userId: id });
    socket?.on('userInfo:user', ({ user }: IUserInfo) => {
      setUser(user);
    });

    return () => {
      socket?.off('userInfo:user');
    };
  }, [id, socket]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <div
            className={styles.img}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src={user?.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
              alt={user?.name}
            />
            {loginUser.id === id && (
              <motion.div
                animate={hover ? 'open' : 'closed'}
                variants={variantsModal}
                initial={'closed'}
                exit={'closed'}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                }}
                className={styles.uploadAvatar}
                onClick={() => setAvatarModal(true)}
              >
                <AddAvatar />
                Загрузить аватар
              </motion.div>
            )}
          </div>
          <Button appearance='secondary'>Редактировать</Button>
        </div>
        <div className={styles.bio}>
          <div className={styles.top}>
            <h1>{user?.name}</h1>
            {usersOnline.includes(id) ? (
              <div className={styles.online}>
                online <div className={styles.green} />
              </div>
            ) : (
              <div className={styles.lastVisit}>
                был в сети {user && calculateTime(user.lastVisit)}
              </div>
            )}
          </div>
        </div>
      </div>
      {loginUser.id === id && (
        <Modal setModal={setAvatarModal} modal={avatarModal}>
          <ChangeAvatar setModal={setAvatarModal} userId={id!} />
        </Modal>
      )}
    </div>
  );
};
