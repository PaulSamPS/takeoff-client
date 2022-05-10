import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import styles from './Profile.module.scss';
import { API_URL } from '../../http/axios';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { ReactComponent as DeleteAvatarIcon } from '../../helpers/icons/deleteAvatar.svg';
import { ReactComponent as EditIcon } from '../../helpers/icons/edit.svg';
import { Modal } from '../../components/Modal/Modal';
import { ReactComponent as ArrowBackIcon } from '../../helpers/icons/arrowBack.svg';
import { ChangeAvatar } from './ChangeAvatar/ChangeAvatar';
import { useNavigate } from 'react-router-dom';
import { RemoveAvatar } from './RemoveAvatar/RemoveAvatar';

export const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [modal, setModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigateToMain = () => {
    navigate('/main');
  };

  return (
    <div className={styles.wrapper}>
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
        <EditIcon className={styles.edit} />
      </div>
      {modal && (
        <Modal setModal={setModal} modal={modal}>
          <ChangeAvatar setModal={setModal} userId={user.id} />
        </Modal>
      )}
      {removeAvatarModal && (
        <RemoveAvatar
          avatar={user.avatar}
          modal={removeAvatarModal}
          setModal={setRemoveAvatarModal}
          userId={user.id}
        />
      )}
    </div>
  );
};
