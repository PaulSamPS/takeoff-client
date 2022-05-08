import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import styles from './Profile.module.scss';
import { API_URL } from '../../http/axios';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { Modal } from '../../components/Modal/Modal';

export const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [modal, setModal] = React.useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <h1>{user.name}</h1>
      <div className={styles.avatar}>
        <img
          src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
          alt={user.name}
        />
        <div className={styles.uploadAvatar} onClick={() => setModal(true)}>
          <AddAvatarIcon />
        </div>
      </div>
      {modal && (
        <Modal setModal={setModal} modal={modal}>
          123
        </Modal>
      )}
    </div>
  );
};
