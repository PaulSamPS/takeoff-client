import React from 'react';
import { UserProps } from './User.props';
import { API_URL } from '../../http/axios';
import { useAppSelector } from '../../hooks/redux';
import { ReactComponent as EditIcon } from '../../helpers/icons/more.svg';
import { ReactComponent as CloseIcon } from '../../helpers/icons/close.svg';
import { ReactComponent as DeleteIcon } from '../../helpers/icons/delete.svg';
import styles from './User.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { EditProfile } from '../EditProfile/EditProfile';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { ReactComponent as DeleteAvatarIcon } from '../../helpers/icons/deleteAvatar.svg';
import { ChangeAvatar } from '../ChangeAvatar/ChangeAvatar';
import { Modal } from '../Modal/Modal';
import { RemoveAvatar } from '../RemoveAvatar/RemoveAvatar';
import { useChat } from '../../hooks/useChat';
import { useNavigate } from 'react-router-dom';
import { Info } from '../Info/Info';

export const User = React.memo(({ user }: UserProps): JSX.Element => {
  const { role, id } = useAppSelector((state) => state.loginReducer.user);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);
  const [deleteUser, setDeleteUser] = React.useState<boolean>(false);
  const { users } = useChat();
  const statusOnline = users.map((user: any) => user.userId);
  const navigate = useNavigate();

  const handleNavigateToUserInfo = () => {
    navigate(`${user._id}`);
    localStorage.setItem('userInfoId', user._id);
  };

  const handleDelete = () => {
    setDeleteUser(true);
    setRemoveAvatarModal(true);
  };

  return (
    <>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onClick={handleNavigateToUserInfo}
      >
        <div className={styles.avatar}>
          <div className={styles.img}>
            <img
              src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
              alt={user.name}
            />
          </div>
          {role === 'admin' && user.avatar == null && (
            <div className={styles.uploadAvatar} onClick={() => setModal(true)}>
              <AddAvatarIcon />
            </div>
          )}
          {role === 'admin' && user.avatar != null && (
            <div className={styles.uploadAvatar} onClick={() => setRemoveAvatarModal(true)}>
              <DeleteAvatarIcon />
            </div>
          )}
          {statusOnline.includes(user._id) && <div className={styles.online} />}
        </div>
        <Info user={user} />
        <AnimatePresence>
          {edit && (
            <EditProfile
              adminUser={user._id}
              className={styles.editProfile}
              isOpen={edit}
              setIsOpen={setEdit}
            />
          )}
        </AnimatePresence>
        {role === 'admin' && id != user._id && (
          <div className={styles.settingsBlock}>
            <DeleteIcon className={styles.delete} onClick={handleDelete} />
            {edit ? (
              <CloseIcon className={styles.edit} onClick={() => setEdit(false)} />
            ) : (
              <EditIcon className={styles.edit} onClick={() => setEdit(true)} />
            )}
          </div>
        )}
      </motion.div>
      <Modal setModal={setModal} modal={modal}>
        <ChangeAvatar setModal={setModal} userId={user._id} />
      </Modal>
      <RemoveAvatar
        avatar={user.avatar}
        modal={removeAvatarModal}
        setModal={setRemoveAvatarModal}
        userId={user._id}
        deleteUser={deleteUser}
        setDeleteUser={setDeleteUser}
      />
    </>
  );
});
