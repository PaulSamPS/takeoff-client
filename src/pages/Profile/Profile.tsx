import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { ReactComponent as DeleteAvatarIcon } from '../../helpers/icons/deleteAvatar.svg';
import { ReactComponent as EditIcon } from '../../helpers/icons/edit.svg';
import { ReactComponent as CloseIcon } from '../../helpers/icons/close.svg';
import { Modal } from '../../components/Modal/Modal';
import { ReactComponent as ArrowBackIcon } from '../../helpers/icons/arrowBack.svg';
import { ChangeAvatar } from '../../components/ChangeAvatar/ChangeAvatar';
import { useNavigate } from 'react-router-dom';
import { RemoveAvatar } from '../../components/RemoveAvatar/RemoveAvatar';
import { EditProfile } from '../../components/EditProfile/EditProfile';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Profile.module.scss';

export const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [modal, setModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigateToMain = () => {
    navigate('/main');
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className={styles.back} onClick={handleNavigateToMain}>
        <ArrowBackIcon />
        Назад
      </div>
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
        </div>
        <div className={styles.info}>
          <label>
            Логин:
            <span>{user.name}</span>
          </label>
          <label>
            Email:
            <span>{user.email}</span>
          </label>
          <label>
            Позиция:
            <span>{user.position}</span>
          </label>
          <label>
            Уровень:
            <span>{user.level}</span>
          </label>
        </div>
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
