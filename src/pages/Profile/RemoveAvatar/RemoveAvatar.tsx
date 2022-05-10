import React from 'react';
import { Button } from '../../../components/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { removeAvatar } from '../../../redux/actions/usersAction';
import { useAppDispatch } from '../../../hooks/redux';
import { RemoveAvatarProps } from './RemoveAvatar.props';
import styles from './RemoveAvatar.module.scss';

export const RemoveAvatar = ({
  modal,
  setModal,
  userId,
  avatar,
}: RemoveAvatarProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleRemoveAvatar = () => {
    dispatch(removeAvatar(userId, avatar)).then(() => {
      setModal(false);
    });
  };

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
