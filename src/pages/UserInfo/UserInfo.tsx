import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import styles from './UserInfo.module.scss';
import { socket } from '../../helpers/socket';
import { calculateTime } from '../../helpers/calculateTime';
import { IUser, IUserAll } from '../../interfaces/user.interface';
import { API_URL } from '../../http/axios';
import { Info } from '../../components/Info/Info';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../../components/Input/Input';
import { useAppSelector } from '../../hooks/redux';
import { ChangeAvatar } from '../../components/ChangeAvatar/ChangeAvatar';
import { RemoveAvatar } from '../../components/RemoveAvatar/RemoveAvatar';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { ReactComponent as DeleteAvatarIcon } from '../../helpers/icons/deleteAvatar.svg';

interface IUserInfo {
  user: IUserAll;
}

export const UserInfo = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users, sendMessage } = useChat();
  const { id } = useParams();
  const [user, setUser] = React.useState<IUserAll | IUser>();
  const usersOnline = users.map((user: any) => user.userId);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [conversationModal, setConversationModal] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [modal, setModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);

  const sendMessageModal = () => {
    if (typeof id === 'string') {
      localStorage.setItem('id', id);
    }
    setConversationModal(true);
  };

  const onSubmit = () => {
    if (submitDisabled) return;
    sendMessage(text);
    setText('');
    setConversationModal(false);
  };

  React.useEffect(() => {
    setSubmitDisabled(!text.trim());
  }, [text]);

  React.useEffect(() => {
    socket.emit('userInfo: get', { userId: id });
    socket.on('userInfo:user', ({ user }: IUserInfo) => {
      setUser(user);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <img
            src={user?.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
            alt={user?.name}
          />
          {loginUser.id === id && (
            <>
              {loginUser.avatar == null ? (
                <div className={styles.uploadAvatar} onClick={() => setModal(true)}>
                  <AddAvatarIcon />
                </div>
              ) : (
                <div className={styles.uploadAvatar} onClick={() => setRemoveAvatarModal(true)}>
                  <DeleteAvatarIcon />
                </div>
              )}
            </>
          )}
        </div>
        <div className={styles.bio}>
          {usersOnline.includes(id) ? (
            <div className={styles.online}>
              Online <div className={styles.green} />
            </div>
          ) : (
            <div className={styles.lastVisit}>
              Был(а) в сети {user && calculateTime(user.lastVisit)}
            </div>
          )}
          <h1>{user?.name}</h1>
          <Info user={user} />
        </div>
        {loginUser.id !== id && (
          <Button appearance='primary' onClick={() => sendMessageModal()}>
            Написать
          </Button>
        )}
      </div>
      <Modal setModal={setConversationModal} modal={conversationModal}>
        <Input
          placeholder='Введите сообщение...'
          autoFocus
          onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          value={text}
        />
        <Button appearance='primary' disabled={submitDisabled} onClick={onSubmit}>
          Отправить
        </Button>
      </Modal>
      <Modal setModal={setModal} modal={modal}>
        <ChangeAvatar setModal={setModal} userId={loginUser.id} />
      </Modal>
      <RemoveAvatar
        avatar={loginUser.avatar}
        modal={removeAvatarModal}
        setModal={setRemoveAvatarModal}
        userId={loginUser.id}
      />
    </div>
  );
};
