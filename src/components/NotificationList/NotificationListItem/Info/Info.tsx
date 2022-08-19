import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../http/axios';
import { calculateTime } from '../../../../helpers/calculateTime';
import { ButtonsFriend, Button, Modal } from '../../../UI';
import { ModalMessage } from '../../../ModalMessage/ModalMessage';
import { InfoProps } from './Info.props';
import { useAppSelector } from '../../../../hooks/redux';

import styles from '../NotificationListItem.module.scss';

export const NotificationListItemInfo = ({
  notification,
  offsetTop,
  coordsEl,
  setIsPostModal,
  setVisibleNotification,
  handleFindPost,
}: InfoProps) => {
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);

  const [conversationModal, setConversationModal] = React.useState<boolean>(false);

  const usersOnline = users.map((user: any) => user.userId);

  const handleSendMessage = (id: string) => {
    localStorage.setItem('receiverUserId', id);
    setConversationModal(true);
  };

  const handleOpenPostModal = () => {
    handleFindPost(notification.post._id);
    setTimeout(() => {
      setIsPostModal(true);
    }, 500);
  };

  return (
    <div className={styles.info}>
      <span className={styles.infoText}>
        <div className={styles.user}>
          <Link
            id='notification'
            onMouseEnter={coordsEl}
            to={`/main/profile/${notification.user._id}`}
            onClick={() => (setVisibleNotification ? setVisibleNotification(false) : undefined)}
          >
            {notification.user.name.firstName + ' ' + notification.user.name.lastName}
          </Link>
          <div
            className={styles.hoverUser}
            style={{
              top: `${offsetTop <= 250 ? '27 px' : 'unset'}`,
              bottom: `${offsetTop > 250 ? '67px' : 'unset'}`,
            }}
          >
            <div className={styles.hoverUserTop}>
              <img
                src={
                  notification.user.avatar == null
                    ? `/photo.png`
                    : `${API_URL}/avatar/${notification.user.avatar}`
                }
                alt={notification.user.name.firstName + '' + notification.user.name.lastName}
              />
              <div className={styles.infoHoverUser}>
                <Link
                  to={`/main/profile/${notification.user._id}`}
                  onClick={() =>
                    setVisibleNotification ? setVisibleNotification(false) : undefined
                  }
                >
                  {notification.user.name.firstName + ' ' + notification.user.name.lastName}
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
              <ButtonsFriend userId={notification.user._id} />
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
        <Link to={'#'} onClick={handleOpenPostModal}>
          {calculateTime(notification.post.createdAt)}
        </Link>
      </span>
      <span>{calculateTime(notification.date)}</span>
    </div>
  );
};
