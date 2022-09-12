import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { ModalMessageProps } from './ModalMessage.prop';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Button, EmojiPicker } from '../UI';
import { useChat } from '../../hooks/useChat';
import { AVATAR_URL } from '../../helpers/constants';
import { useAppDispatch } from '../../hooks/redux';
import { setOpenChat } from '../../redux/reducers/openChatReducer';

import styles from './ModalMessage.module.scss';

export const ModalMessage = ({ friend, setModal, isModal }: ModalMessageProps): JSX.Element => {
  const [text, setText] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const { sendMessage, chats } = useChat();

  const userId = localStorage.getItem('receiverUserId');

  const handleSendMessage = () => {
    sendMessage(text);
    setModal(false);
  };

  const handleOpenChat = () => {
    const newOpenChat = {
      name: friend!.name.firstName + ' ' + friend!.name.lastName,
      link: `/main/conversations/${userId}`,
      id: userId!,
    };
    dispatch(setOpenChat(newOpenChat));
    setModal(false);
  };

  React.useEffect(() => {
    document.getElementById('message')?.focus();
  }, [isModal]);

  return (
    <div className={styles.modalMessage}>
      <div className={styles.topModal}>
        <span>Новое сообщение</span>
        {chats.find((chat) => chat.messagesWith === userId) && (
          <Link to={`/main/conversations/${userId}`} onClick={handleOpenChat}>
            Перейтик диалогу c {friend!.name.firstName + ' ' + friend!.name.lastName}
          </Link>
        )}
      </div>
      <div className={styles.user}>
        <Link to={`/main/profile/${userId}`} replace className={styles.followers}>
          <img
            src={
              friend!.avatar == null ? `/photo.png` : `${API_URL}/${AVATAR_URL}/${friend!.avatar}`
            }
            alt={friend!.name.firstName + ' ' + friend!.name.lastName}
          />
        </Link>
        <div className={styles.userInfo}>
          <Link to={`/main/profile/${userId}`} className={styles.name}>
            {friend!.name.firstName + ' ' + friend!.name.lastName}
          </Link>
          <span> был в сети {calculateTime(friend!.lastVisit)}</span>
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
            <EmojiPicker setText={setText} text={text} left={-20} />
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
