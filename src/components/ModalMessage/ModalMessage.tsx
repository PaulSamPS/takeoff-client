import React, { FormEvent } from 'react';
import styles from './ModalMessage.module.scss';
import { Link } from 'react-router-dom';
import { ModalMessageProps } from './ModalMessage.prop';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Button } from '../Button/Button';
import { useChat } from '../../hooks/useChat';

export const ModalMessage = ({ friend, setModal, isModal }: ModalMessageProps) => {
  const [text, setText] = React.useState<string | null>('');
  const { sendMessage } = useChat();

  const handleSendMessage = () => {
    localStorage.setItem('receiverUserId', friend.id!.toString());
    sendMessage(text);
    setModal(false);
  };

  React.useEffect(() => {
    document.getElementById('message')?.focus();
  }, [isModal]);

  return (
    <div className={styles.modalMessage}>
      <div className={styles.topModal}>
        <span>Новое сообщение</span>
        <Link to={`/main/conversations/${friend.id}`}>Перейтик диалогу c {friend.name}</Link>
      </div>
      <div className={styles.user}>
        <Link to={`/main/people/${friend.id}`} replace className={styles.followers}>
          <img
            src={friend.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend.avatar}`}
            alt={friend.name}
          />
        </Link>
        <div className={styles.userInfo}>
          <Link to={`/main/people/${friend.id}`} className={styles.name}>
            {friend.name}
          </Link>
          <span>{calculateTime(friend.lastVisit)}</span>
        </div>
      </div>
      <div className={styles.message}>
        <div
          className={styles.input}
          id='message'
          contentEditable='true'
          placeholder='Написать сообщение...'
          role='textbox'
          aria-multiline='true'
          onInput={(e: FormEvent<HTMLDivElement>) => setText(e.currentTarget.textContent)}
        ></div>
        <div className={styles.button}>
          <Button
            appearance='primary'
            disabled={!(text && text.length > 0)}
            onClick={handleSendMessage}
          >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};
