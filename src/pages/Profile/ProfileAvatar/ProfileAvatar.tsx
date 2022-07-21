import React from 'react';
import styles from './ProfileAvatar.module.scss';
import { API_URL } from '../../../http/axios';
import { motion } from 'framer-motion';
import { ReactComponent as AddAvatar } from '../../../helpers/icons/addAvatar.svg';
import { ReactComponent as AllReadyFriendsIcon } from '../../../helpers/icons/allreadyFriens.svg';
import { ReactComponent as ArrowDownIcon } from '../../../helpers/icons/arrowDown.svg';
import { Button } from '../../../components/UI/Button/Button';
import { useRequest } from '../../../hooks/useRequest';
import { useFollow } from '../../../hooks/useFollow';
import { ProfileAvatarProps } from './ProfileAvatar.props';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { Modal } from '../../../components/UI/Modal/Modal';
import { ChangeAvatar } from '../../../components/ChangeAvatar/ChangeAvatar';
import { ModalMessage } from '../../../components/ModalMessage/ModalMessage';

export const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
  const { id } = useParams();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { friends, request, addFriend } = useRequest();
  const { followings, handleFollow, handleUnfollow } = useFollow();
  const [hover, setHover] = React.useState<boolean>(false);
  const friendsDone = friends.map((friend) => friend.id);
  const requestsDone = request.map((request) => request.id);
  const followingDone = followings !== null ? followings.map((following) => following.id) : [];
  const [conversationModal, setConversationModal] = React.useState<boolean>(false);
  const [avatarModal, setAvatarModal] = React.useState<boolean>(false);

  const variantsModal = {
    open: { opacity: 1, height: '20%' },
    closed: { opacity: 0, height: 0 },
  };

  const handleSendMessage = () => {
    localStorage.setItem('receiverUserId', id!);
    setConversationModal(true);
  };

  return (
    <div className={styles.avatar}>
      <div
        className={styles.img}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={user?.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
          alt={user?.name}
        />
        {loginUser.id === id && (
          <motion.div
            animate={hover ? 'open' : 'closed'}
            variants={variantsModal}
            initial={'closed'}
            exit={'closed'}
            transition={{
              duration: 0.5,
              type: 'spring',
            }}
            className={styles.uploadAvatar}
            onClick={() => setAvatarModal(true)}
          >
            <AddAvatar />
            Загрузить аватар
          </motion.div>
        )}
      </div>
      {loginUser.id === id && <Button appearance='secondary'>Редактировать</Button>}
      {loginUser.id !== id && (
        <Button appearance='primary' className={styles.message} onClick={handleSendMessage}>
          Написать сообщение
        </Button>
      )}
      {loginUser.id !== id && (
        <>
          {!friendsDone.includes(id!) ? (
            <div className={styles.follow}>
              {!followingDone.includes(id) && requestsDone.includes(id!) ? (
                <Button appearance='primary' onClick={() => addFriend(id!)}>
                  Добавить в друзья
                </Button>
              ) : followingDone.includes(loginUser.id) ? (
                <Button appearance='primary' onClick={handleUnfollow}>
                  Отписаться
                </Button>
              ) : (
                <Button appearance='primary' onClick={handleFollow}>
                  Подписаться
                </Button>
              )}
            </div>
          ) : (
            <div className={styles.follow}>
              <Button className={styles.allReadyFriends} appearance='primary'>
                <AllReadyFriendsIcon className={styles.allReadyIcon} />
                У вас в друзьях
                <ArrowDownIcon className={styles.arrowDown} />
              </Button>
            </div>
          )}
        </>
      )}
      {loginUser.id === id && (
        <Modal setModal={setAvatarModal} modal={avatarModal}>
          <ChangeAvatar setModal={setAvatarModal} userId={id!} />
        </Modal>
      )}
      <Modal setModal={setConversationModal} modal={conversationModal}>
        <ModalMessage friend={user} setModal={setConversationModal} isModal={conversationModal} />
      </Modal>
    </div>
  );
};
