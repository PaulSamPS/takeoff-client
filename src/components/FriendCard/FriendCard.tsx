import React from 'react';
import styles from './FriendCard.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { FriendCardProps } from './FriendCard.props';
import { Modal } from '../Modal/Modal';
import { ModalMessage } from '../ModalMessage/ModalMessage';

export const FriendCard = ({ friend }: FriendCardProps) => {
  const [modal, setModal] = React.useState<boolean>(false);

  const handleSendMessage = () => {
    setModal(true);
  };

  return (
    <>
      <div className={styles.card}>
        <Link to={`/main/profile/${friend.id}`} replace className={styles.followers}>
          <img
            src={friend.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend.avatar}`}
            alt={friend.name}
          />
        </Link>
        <div className={styles.body}>
          <span className={styles.userName}>{friend.name}</span>
          <span className={styles.position}>{friend.position}</span>
          <span className={styles.sendMessage} onClick={handleSendMessage}>
            Написать сообщение
          </span>
        </div>
      </div>
      <Modal setModal={setModal} modal={modal}>
        <ModalMessage friend={friend} setModal={setModal} isModal={modal} />
      </Modal>
    </>
  );
};
