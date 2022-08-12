import React, { ChangeEvent } from 'react';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import { ReactComponent as ArrowBack } from '../../helpers/icons/arrowBack.svg';
import styles from './Chat.module.scss';
import { Button } from '../../components/UI/Button/Button';
import { useChat } from '../../hooks/useChat';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { SocketContext } from '../../helpers/context';
import 'emoji-mart/css/emoji-mart.css';
import { Input } from '../../components/UI/Input/Input';
import { EmojiPicker } from '../../components/UI/EmojiPicker/EmojiPicker';
import { ChatMessages } from './ChatMessages';

export const Chat = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);

  const [text, setText] = React.useState<string>('');
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const { sendMessage, bannerData, loadingMessages, messages, deleteMessage } = useChat();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onlineUser = users.map((u) => u.userId);

  const { id } = useParams();

  const handleSetText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  React.useEffect(() => {
    setSubmitDisabled(!text?.trim());
  }, [text]);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (submitDisabled) return;
    sendMessage(text);
    setText('');
  };

  React.useEffect(() => {
    socket?.emit('message:read', { userId: loginUser.id, msgSendToUserId: id });
    setTimeout(() => socket?.emit('chat:get', { userId: loginUser.id }), 1000);
  }, [socket]);

  return (
    <>
      <div className={styles.borderTop} />
      <div className={styles.chatWith}>
        <div className={styles.back}>
          <Link to={'/main/conversations'}>
            <ArrowBack /> Назад
          </Link>
        </div>
        <div className={styles.chatWithName}>
          <span className={styles.user}>{bannerData.name}</span>
          <span className={styles.lastVisit}>
            {onlineUser.includes(id) ? (
              'В сети'
            ) : (
              <span>
                {bannerData.bio.gender === 'Мужской' ? 'был' : 'была'}{' '}
                {calculateTime(bannerData.lastVisit)}
              </span>
            )}
          </span>
        </div>
        <Link to={`/main/profile/${id}`} className={styles.avatar}>
          <img
            src={
              bannerData.avatar == null ? `/photo.png` : `${API_URL}/avatar/${bannerData.avatar}`
            }
            alt={bannerData.name}
          />
        </Link>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {!loadingMessages ? (
              <div className={styles.chat}>
                {messages.map((message, index) => (
                  <ChatMessages
                    key={message._id + ' ' + index}
                    message={message}
                    bannerData={bannerData}
                    deleteMessage={deleteMessage}
                  />
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className={styles.bottomContainer}>
        <div className={styles.bottom}>
          <Input
            className={styles.input}
            placeholder='Введите сообщение...'
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetText(e)}
            value={text}
            ref={inputRef}
          />
          <EmojiPicker
            className={styles.emoji}
            setText={setText}
            text={text}
            bottom={60}
            left={-140}
          />
          <Button appearance='primary' disabled={submitDisabled}>
            <SendIcon className={styles.send} />
          </Button>
        </div>
      </form>
      <div className={styles.borderBottom} />
    </>
  );
};
