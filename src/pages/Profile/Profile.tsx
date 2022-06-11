import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { ReactComponent as DeleteAvatarIcon } from '../../helpers/icons/deleteAvatar.svg';
import { ReactComponent as EditIcon } from '../../helpers/icons/edit.svg';
import { ReactComponent as CloseIcon } from '../../helpers/icons/close.svg';
import { Modal } from '../../components/Modal/Modal';
import { ChangeAvatar } from '../../components/ChangeAvatar/ChangeAvatar';
import { RemoveAvatar } from '../../components/RemoveAvatar/RemoveAvatar';
import { EditProfile } from '../../components/EditProfile/EditProfile';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Profile.module.scss';
import { useChat } from '../../hooks/useChat';
import { Info } from '../../components/Info/Info';

export const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [modal, setModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const { users } = useChat();
  const statusOnline = users.map((user: any) => user.userId);

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className={styles.card}>
        <div className={styles.avatar}>
          <img
            src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
            alt={user.name}
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
          {statusOnline.includes(user.id) && <div className={styles.online} />}
        </div>
        <Info user={user} className={styles.info} />
        {edit ? (
          <CloseIcon className={styles.edit} onClick={() => setEdit(false)} />
        ) : (
          <EditIcon className={styles.edit} onClick={() => setEdit(true)} />
        )}
        <AnimatePresence>
          {edit && <EditProfile className={styles.editProfile} isOpen={edit} setIsOpen={setEdit} />}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {modal && (
          <Modal setModal={setModal} modal={modal}>
            <ChangeAvatar setModal={setModal} userId={user.id} />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {removeAvatarModal && (
          <RemoveAvatar
            avatar={user.avatar}
            modal={removeAvatarModal}
            setModal={setRemoveAvatarModal}
            userId={user.id}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
