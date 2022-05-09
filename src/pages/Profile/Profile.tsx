import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styles from './Profile.module.scss';
import { API_URL } from '../../http/axios';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { ReactComponent as DeleteAvatarIcon } from '../../helpers/icons/deleteAvatar.svg';
import { Modal } from '../../components/Modal/Modal';
import { ReactComponent as ArrowBackIcon } from '../../helpers/icons/arrowBack.svg';
import { ChangeAvatar } from './ChangeAvatar/ChangeAvatar';
import { Button } from '../../components/Button/Button';
import { removeAvatar } from '../../redux/actions/usersAction';

export const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [modal, setModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleRemoveAvatar = (id: number, avatar: string) => {
    dispatch(removeAvatar(id, avatar)).then(() => {
      setRemoveAvatarModal(false);
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.back}>
        <ArrowBackIcon />
        Назад
      </div>
      <h1>{user.name}</h1>
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
      {modal && (
        <Modal setModal={setModal} modal={modal}>
          <ChangeAvatar setModal={setModal} userId={user.id} />
        </Modal>
      )}
      {removeAvatarModal && (
        <Modal setModal={setRemoveAvatarModal} modal={removeAvatarModal}>
          <div className={styles.removeAvatar}>
            <span>Удалить?</span>
            <div className={styles.choose}>
              <Button appearance='primary' onClick={() => handleRemoveAvatar(user.id, user.avatar)}>
                Да
              </Button>
              <Button appearance='primary' onClick={() => setRemoveAvatarModal(false)}>
                Нет
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
