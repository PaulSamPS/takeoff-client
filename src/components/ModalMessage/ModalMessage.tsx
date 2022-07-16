import React, { ChangeEvent } from 'react';
import styles from './ModalMessage.module.scss';
import { Link } from 'react-router-dom';
import { ModalMessageProps } from './ModalMessage.prop';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Button } from '../Button/Button';
import { useChat } from '../../hooks/useChat';
import { motion } from 'framer-motion';
import { BaseEmoji, Picker } from 'emoji-mart';
import { ReactComponent as SmileIcon } from '../../helpers/icons/smile.svg';

export const ModalMessage = ({ friend, setModal, isModal }: ModalMessageProps) => {
  const [text, setText] = React.useState<string>('');
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const { sendMessage } = useChat();

  const addEmoji = (e: BaseEmoji) => {
    setText(text + '' + e.colons);
  };

  const variantsModal = {
    open: { opacity: 1, height: '20%' },
    closed: { opacity: 0, height: 0 },
  };

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
        <Link to={`/conversations?with=${friend.id}`}>Перейтик диалогу c {friend.name}</Link>
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
            {showEmoji && (
              <motion.div
                className={styles.pickerModal}
                animate={showEmoji ? 'open' : 'closed'}
                variants={variantsModal}
                initial={'closed'}
                exit={'closed'}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                }}
              >
                <Picker
                  onSelect={addEmoji}
                  skin={1}
                  theme={'light'}
                  perLine={8}
                  set={'apple'}
                  emojiSize={25}
                  i18n={{ categories: { people: 'смайлы', recent: 'недавние' } }}
                  style={{
                    top: 'unset',
                    right: 'unset',
                    bottom: '77px',
                    left: '-0',
                    zIndex: '8',
                  }}
                />
              </motion.div>
            )}
            <div>
              <SmileIcon className={styles.emoji} onClick={() => setShowEmoji(!showEmoji)} />
            </div>
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
