import React, { ChangeEvent } from 'react';
import styles from './ModalMessage.module.scss';
import { Link } from 'react-router-dom';
import { ModalMessageProps } from './ModalMessage.prop';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Button } from '../UI/Button/Button';
import { useChat } from '../../hooks/useChat';
import { EmojiPicker } from '../UI/EmojiPicker/EmojiPicker';

export const ModalMessage = ({ friend, setModal, isModal }: ModalMessageProps) => {
  const [text, setText] = React.useState<string>('');
  const { sendMessage } = useChat();
  const userId = localStorage.getItem('receiverUserId');

  const handleSendMessage = () => {
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
        <Link to={`/main/conversations?with=${userId}`}>Перейтик диалогу c {friend!.name}</Link>
      </div>
      <div className={styles.user}>
        <Link to={`/main/profile/${userId}`} replace className={styles.followers}>
          <img
            src={friend!.avatar == null ? `/photo.png` : `${API_URL}/avatar/${friend!.avatar}`}
            alt={friend!.name}
          />
        </Link>
        <div className={styles.userInfo}>
          <Link to={`/main/profile/${userId}`} className={styles.name}>
            {friend!.name}
          </Link>
          <span>{calculateTime(friend!.lastVisit)}</span>
        </div>
      </div>
      <div className={styles.message}>
        <textarea
          className={styles.textarea}
          placeholder='Написать сообщение...'
          role='textbox'
          aria-multiline='true'
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        />
        <div className={styles.bottom}>
          <div className={styles.picker}>
            <EmojiPicker setText={setText} text={text} bottom={52} left={-20} />
          </div>
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
    </div>
  );
};
