import React, { memo } from 'react';
import { API_URL } from '../../../http/axios';
import { ReactComponent as AddAvatar } from '../../../helpers/icons/addAvatar.svg';
import { ProfileAvatarProps } from './Avatar.props';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { ModalChangeAvatar } from '../../ModalChangeAvatar/ModalChangeAvatar';
import { ModalMessage } from '../../ModalMessage/ModalMessage';
import { Button, ButtonsFriend, Modal, Spinner } from '../../UI';
import { AVATAR_URL } from '../../../helpers/constants';

import { motion } from 'framer-motion';

import styles from './Avatar.module.scss';

export const Avatar = memo(({ user, isLoadingUserInfo }: ProfileAvatarProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [hover, setHover] = React.useState<boolean>(false);
  const [conversationModal, setConversationModal] = React.useState<boolean>(false);
  const [avatarModal, setAvatarModal] = React.useState<boolean>(false);

  const { id } = useParams();

  const variantsModal = {
    open: { opacity: 1, height: '20%' },
    closed: { opacity: 0, height: 0 },
  };

  const handleSendMessage = React.useCallback(() => {
    localStorage.setItem('receiverUserId', id!);
    setConversationModal(true);
  }, []);

  return (
    <div className={styles.avatar}>
      {isLoadingUserInfo ? (
        <Spinner />
      ) : (
        <>
          <div
            className={styles.img}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={() => setHover(true)}
          >
            <img
              src={user?.avatar == null ? `/photo.png` : `${API_URL}/${AVATAR_URL}/${user.avatar}`}
              alt={user?.name.firstName + '' + user?.name.lastName}
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
          {loginUser.id === id && (
            <Link to={'/main/edit'} className={styles.edit}>
              <Button appearance='secondary'>Редактировать</Button>
            </Link>
          )}
          {loginUser.id !== id && (
            <Button appearance='primary' className={styles.message} onClick={handleSendMessage}>
              Написать сообщение
            </Button>
          )}
          {loginUser.id !== id && <ButtonsFriend userId={id} />}
          {loginUser.id === id && (
            <Modal setModal={setAvatarModal} modal={avatarModal}>
              <ModalChangeAvatar setModal={setAvatarModal} userId={id!} />
            </Modal>
          )}
          <Modal setModal={setConversationModal} modal={conversationModal}>
            <ModalMessage
              friend={user}
              setModal={setConversationModal}
              isModal={conversationModal}
            />
          </Modal>
        </>
      )}
    </div>
  );
});
