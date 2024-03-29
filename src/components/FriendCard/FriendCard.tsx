import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { FriendCardProps } from './FriendCard.props';
import { Modal } from '../UI';
import { ModalMessage } from '../ModalMessage/ModalMessage';
import { AVATAR_URL } from '../../helpers/constants';

import styles from './FriendCard.module.scss';

export const FriendCard = ({ friend }: FriendCardProps): JSX.Element => {
  const [modal, setModal] = React.useState<boolean>(false);

  const handleSendMessage = () => {
    localStorage.setItem('receiverUserId', friend.id!);
    setModal(true);
  };

  return (
    <>
      <div className={styles.card}>
        <Link to={`/main/profile/${friend.id}`} replace className={styles.followers}>
          <img
            src={friend.avatar == null ? `/photo.png` : `${API_URL}/${AVATAR_URL}/${friend.avatar}`}
            alt={friend.name.firstName + ' ' + friend.name.lastName}
          />
        </Link>
        <div className={styles.body}>
          <Link to={`/main/profile/${friend.id}`} className={styles.userName}>
            {friend.name.firstName + ' ' + friend.name.lastName}
          </Link>
          <span className={styles.city}>{friend.bio.city}</span>
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
