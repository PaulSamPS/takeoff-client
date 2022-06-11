import React, { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import styles from './UserInfo.module.scss';
import { socket } from '../../helpers/socket';
import { calculateTime } from '../../helpers/calculateTime';
import { IUserAll } from '../../interfaces/user.interface';
import { API_URL } from '../../http/axios';
import { Info } from '../../components/Info/Info';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../../components/Input/Input';

interface IUserInfo {
  user: IUserAll;
}

export const UserInfo = () => {
  const { users, chats, sendMessage } = useChat();
  const { id } = useParams();
  const [user, setUser] = React.useState<IUserAll>();
  const usersOnline = users.map((user: any) => user.userId);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [conversationModal, setConversationModal] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const navigate = useNavigate();

  const navigateToMessages = () => {
    if (typeof id === 'string') {
      localStorage.setItem('id', id);
    }
    navigate(`/main/conversations/${id}`, { replace: true });
  };

  const navigateToChat = () => {
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
        </div>
        <div className={styles.bio}>
          {usersOnline.includes(id) ? (
            <div className={styles.online}>
              Online <div className={styles.green} />
            </div>
          ) : (
            <div className={styles.lastVisit}>
              Был в сети {user && calculateTime(user.lastVisit)}
            </div>
          )}
          <h1>{user?.name}</h1>
          <Info user={user} />
        </div>
        <Button
          appearance='primary'
          onClick={
            chats.filter((user: any) => user.messagesWith === id).length > 0
              ? () => navigateToMessages()
              : () => navigateToChat()
          }
        >
          {chats.filter((user: any) => user.messagesWith === id).length > 0
            ? 'Перейти в чат'
            : 'Написать'}
        </Button>
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
    </div>
  );
};
