import React from 'react';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { RemoveAvatarProps } from './RemoveAvatar.props';
import styles from './RemoveAvatar.module.scss';
import { useRemoveAvatar } from '../../hooks/useRemoveAvatar';

export const RemoveAvatar = ({
  modal,
  setModal,
  userId,
  avatar,
  deleteUser,
  setDeleteUser,
}: RemoveAvatarProps): JSX.Element => {
  const handleRemoveAvatar = useRemoveAvatar({
    avatar,
    userId,
    setModal,
    setDeleteUser,
    deleteUser,
  });

  return (
    <Modal setModal={setModal} modal={modal}>
      <div className={styles.removeAvatar}>
        <span>Удалить?</span>
        <div className={styles.choose}>
          <Button appearance='primary' onClick={handleRemoveAvatar}>
            Да
          </Button>
          <Button appearance='primary' onClick={() => setModal(false)}>
            Нет
          </Button>
        </div>
      </div>
    </Modal>
  );
};
