import React from 'react';
import styles from './Notification.module.scss';
import { API_URL } from '../../http/axios';
import { Link } from 'react-router-dom';
import { calculateTime } from '../../helpers/calculateTime';
import { Button } from '../UI/Button/Button';
import { Modal } from '../UI/Modal/Modal';
import { ModalMessage } from '../ModalMessage/ModalMessage';
import { ReactComponent as ArrowDownIcon } from '../../helpers/icons/arrowDown.svg';
import { ReactComponent as NotificationCommentIcon } from '../../helpers/icons/notificationComment.svg';
import { NotificationProps } from './Notification.props';
import { useAppSelector } from '../../hooks/redux';
import { ButtonsFriend } from '../UI/ButtonsFriend/ButtonsFriend';
import cn from 'classnames';
import { usePost } from '../../hooks/usePost';
import { Post } from '../Post/Post';

export const Notification = ({ notification, ...props }: NotificationProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);

  const [conversationModal, setConversationModal] = React.useState<boolean>(false);
  const [isPostModal, setIsPostModal] = React.useState<boolean>(false);
  const [offsetTop, setOffsetTop] = React.useState<number>(0);

  const { handleFindPost, findPost } = usePost(notification.post);

  const notificationRef = React.useRef<HTMLDivElement>(null);
  const usersOnline = users.map((user: any) => user.userId);

  const coordsEl = () => {
    const rect = notificationRef.current?.getBoundingClientRect();
    setOffsetTop(rect!.top);
    localStorage.setItem('followId', notification.user.id);
    localStorage.setItem('friendsUserInfo', notification.user.id);
  };

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
    <div className={styles.notification} ref={notificationRef} {...props}>
      <div className={styles.avatar}>
        <img
          src={
            notification.user.avatar == null
              ? `/photo.png`
              : `${API_URL}/avatar/${notification.user.avatar}`
          }
          alt={notification.user.name.firstName + '' + notification.user.name.lastName}
        />
        {notification.type === 'newLike' && (
          <img className={styles.icon} src={'/like.png'} alt={'like'} />
        )}
        {notification.type === 'newComment' && (
          <div className={cn(styles.icon, styles.notificationComment)}>
            <NotificationCommentIcon />
          </div>
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.infoText}>
          <div className={styles.user}>
            <Link
              id='notification'
              onMouseEnter={coordsEl}
              to={`/main/profile/${notification.user.id}`}
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
                  <Link to={`/main/profile/${notification.user.id}`}>
                    {notification.user.name.firstName + ' ' + notification.user.name.lastName}
                  </Link>
                  {usersOnline.includes(notification.user.id) ? (
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
                <ButtonsFriend userId={notification.user.id} />
                <Button
                  appearance='primary'
                  className={styles.message}
                  onClick={() => handleSendMessage(notification.user.id)}
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
      <div className={styles.postImage}>
        {notification.post.image !== null && (
          <img
            src={`${API_URL}/post/${notification.post.image}`}
            alt={loginUser.name.firstName + '' + loginUser.name.lastName}
          />
        )}
        <Button appearance='transparent'>
          <ArrowDownIcon />
        </Button>
      </div>
      <Modal setModal={setIsPostModal} modal={isPostModal} postModal={isPostModal}>
        <Post post={findPost} postModal={isPostModal} />
      </Modal>
    </div>
  );
};
