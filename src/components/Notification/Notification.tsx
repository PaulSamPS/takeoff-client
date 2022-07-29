import React from 'react';
import styles from './Notification.module.scss';
import { API_URL } from '../../http/axios';
import { Link } from 'react-router-dom';
import { calculateTime } from '../../helpers/calculateTime';
import { Button } from '../UI/Button/Button';
import { Modal } from '../UI/Modal/Modal';
import { ModalMessage } from '../ModalMessage/ModalMessage';
import { ReactComponent as ArrowDownIcon } from '../../helpers/icons/arrowDown.svg';
import { NotificationProps } from './Notification.props';
import { useAppSelector } from '../../hooks/redux';
import { ButtonsFriend } from '../UI/ButtonsFriend/ButtonsFriend';

export const Notification = ({ notification, ...props }: NotificationProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const usersOnline = users.map((user: any) => user.userId);
  const [conversationModal, setConversationModal] = React.useState<boolean>(false);

  const handleSendMessage = (id: string) => {
    localStorage.setItem('receiverUserId', id);
    setConversationModal(true);
  };

  return (
    <div className={styles.notification} {...props}>
      <div className={styles.avatar}>
        <img
          src={
            notification.user.avatar == null
              ? `/photo.png`
              : `${API_URL}/avatar/${notification.user.avatar}`
          }
          alt={notification.user.firstName + '' + notification.user.lastName}
        />
        {notification.type === 'newLike' && (
          <img className={styles.icon} src={'/like.png'} alt={'like'} />
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.infoText}>
          <div className={styles.user}>
            <Link to={`/main/profile/${notification.user._id}`}>
              {notification.user.firstName + ' ' + notification.user.lastName}
            </Link>
            <div className={styles.hoverUser}>
              <div className={styles.hoverUserTop}>
                <img
                  src={
                    notification.user.avatar == null
                      ? `/photo.png`
                      : `${API_URL}/avatar/${notification.user.avatar}`
                  }
                  alt={notification.user.firstName + '' + notification.user.lastName}
                />
                <div className={styles.infoHoverUser}>
                  <Link to={`/main/profile/${notification.user._id}`}>
                    {notification.user.firstName + ' ' + notification.user.lastName}
                  </Link>
                  {usersOnline.includes(notification.user._id) ? (
                    <div className={styles.online}>online</div>
                  ) : (
                    <div className={styles.lastVisit}>
                      {notification.user.bio.gender === 'Мужской' ? 'заходил ' : 'заходила '}
                      {calculateTime(notification.user.lastVisit)}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.infoHoverBottom}>
                <ButtonsFriend id={notification.user._id} />
                <Button
                  appearance='primary'
                  className={styles.message}
                  onClick={() => handleSendMessage(notification.user._id)}
                >
                  Написать сообщение
                </Button>
              </div>
              <Modal setModal={setConversationModal} modal={conversationModal}>
                <ModalMessage
                  friend={notification.user}
                  setModal={setConversationModal}
                  isModal={conversationModal}
                />
              </Modal>
            </div>
          </div>
          {notification.type === 'newLike' && <span>оценил ваш пост от</span>}
          {notification.type === 'newComment' && <span>прокомментировал ваш пост от</span>}
          <Link to={'#'}>{calculateTime(notification.post.createdAt)}</Link>
        </span>
        <span>{calculateTime(notification.date)}</span>
      </div>
      <div className={styles.postImage}>
        <img
          src={
            notification.post.image == null
              ? `/photo.png`
              : `${API_URL}/post/${notification.post.image}`
          }
          alt={loginUser.firstName + '' + loginUser.lastName}
        />
        <Button appearance='transparent'>
          <ArrowDownIcon />
        </Button>
      </div>
    </div>
  );
};
