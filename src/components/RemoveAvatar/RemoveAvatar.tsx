import React from 'react';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { adminRemoveAvatar, removeAvatar, removeUser } from '../../redux/actions/usersAction';
import { useAppDispatch } from '../../hooks/redux';
import { RemoveAvatarProps } from './RemoveAvatar.props';
import styles from './RemoveAvatar.module.scss';
import { useLocation } from 'react-router-dom';

export const RemoveAvatar = ({
  modal,
  setModal,
  userId,
  avatar,
  deleteUser,
  setDeleteUser,
}: RemoveAvatarProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleRemoveAvatar = () => {
    if (deleteUser) {
      dispatch(removeUser(userId, avatar)).then(() => {
        if (setDeleteUser) {
          setDeleteUser(false);
        }
        setModal(false);
      });
    } else {
      if (location.pathname == '/main') {
        dispatch(adminRemoveAvatar(userId, avatar)).then(() => {
          setModal(false);
        });
      } else {
        dispatch(removeAvatar(userId, avatar)).then(() => {
          setModal(false);
        });
      }
    }
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
