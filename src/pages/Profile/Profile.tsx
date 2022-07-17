import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import styles from './Profile.module.scss';
import { Button } from '../../components/Button/Button';
import { motion } from 'framer-motion';
import { ReactComponent as AddAvatar } from '../../helpers/icons/addAvatar.svg';
import { Modal } from '../../components/Modal/Modal';
import { ChangeAvatar } from '../../components/ChangeAvatar/ChangeAvatar';
import { IUser, IUserAll } from '../../interfaces/user.interface';
import { SocketContext } from '../../helpers/context';
import { useParams } from 'react-router-dom';
import { ProfileBio } from './ProfileBio/ProfileBio';
import { useRequest } from '../../hooks/useRequest';
import { useFollow } from '../../hooks/useFollow';
import { ModalMessage } from '../../components/ModalMessage/ModalMessage';

interface IUserInfo {
  user: IUserAll;
}

export const Profile = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const { id } = useParams();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [avatarModal, setAvatarModal] = React.useState<boolean>(false);
  const [hover, setHover] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUserAll | IUser>();
  const [conversationModal, setConversationModal] = React.useState<boolean>(false);
  const { friends, request, addFriend } = useRequest();
  const { followings, handleFollow, handleUnfollow } = useFollow();
  const friendsDone = friends.map((friend) => friend.id);
  const requestsDone = request.map((request) => request.id);
  const followingDone = followings !== null ? followings.map((following) => following.id) : [];

  const variantsModal = {
    open: { opacity: 1, height: '20%' },
    closed: { opacity: 0, height: 0 },
  };

  const handleSendMessage = () => {
    localStorage.setItem('receiverUserId', id!);
    setConversationModal(true);
  };

  React.useEffect(() => {
    socket?.emit('userInfo:get', { userId: id });
    socket?.on('userInfo:user', ({ user }: IUserInfo) => {
      setUser(user);
    });

    return () => {
      socket?.off('userInfo:user');
    };
  }, [id, socket]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
              Написать
            </Button>
          )}
          {loginUser.id !== id && (
            <>
              {!friendsDone.includes(id) ? (
                <div className={styles.follow}>
                  {!followingDone.includes(id) && requestsDone.includes(id) ? (
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
                  <Button appearance='primary'>Удалить из друзей</Button>
                </div>
              )}
            </>
          )}
        </div>
        <ProfileBio user={user} />
      </div>
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
