import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { ReactComponent as DeleteAvatarIcon } from '../../helpers/icons/deleteAvatar.svg';
import { Modal } from '../../components/Modal/Modal';
import { ChangeAvatar } from '../../components/ChangeAvatar/ChangeAvatar';
import { RemoveAvatar } from '../../components/RemoveAvatar/RemoveAvatar';
import { motion } from 'framer-motion';
import styles from './Profile.module.scss';
import { useChat } from '../../hooks/useChat';
import { Info } from '../../components/Info/Info';
import { calculateTime } from '../../helpers/calculateTime';

export const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [modal, setModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);
  const { users } = useChat();
  const usersOnline = users.map((user: any) => user.userId);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <img
            src={user?.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
            alt={user?.name}
          />
          {user.avatar == null ? (
            <div className={styles.uploadAvatar} onClick={() => setModal(true)}>
              <AddAvatarIcon />
            </div>
          ) : (
            <div className={styles.uploadAvatar} onClick={() => setRemoveAvatarModal(true)}>
              <DeleteAvatarIcon />
            </div>
          )}
        </div>
        <div className={styles.bio}>
          {usersOnline.includes(user.id) ? (
            <div className={styles.online}>
              Online <div className={styles.green} />
            </div>
          ) : (
            <div className={styles.lastVisit}>
              Был в сети {user && calculateTime(user.lastVisit)}
            </div>
          )}
          <h1>{user?.name}</h1>
          <Info user={user} />
        </div>
      </div>
      <Modal setModal={setModal} modal={modal}>
        <ChangeAvatar setModal={setModal} userId={user.id} />
      </Modal>
      <RemoveAvatar
        avatar={user.avatar}
        modal={removeAvatarModal}
        setModal={setRemoveAvatarModal}
        userId={user.id}
      />
    </motion.div>
  );
};
