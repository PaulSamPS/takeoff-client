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

export const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const [avatarModal, setAvatarModal] = React.useState<boolean>(false);
  const usersOnline = users.map((user: any) => user.userId);
  const [hover, setHover] = React.useState<boolean>(false);

  const variantsModal = {
    open: { opacity: 1, height: '20%' },
    closed: { opacity: 0, height: 0 },
  };

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
          </div>
          <Button appearance='secondary'>Редактировать</Button>
        </div>
        <div className={styles.bio}>
          <div className={styles.top}>
            <h1>{user?.name}</h1>
            {usersOnline.includes(user.id) ? (
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
      <Modal setModal={setAvatarModal} modal={avatarModal}>
        <ChangeAvatar setModal={setAvatarModal} userId={user.id} />
      </Modal>
    </div>
  );
};
