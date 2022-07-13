import React, { ChangeEvent } from 'react';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import { ReactComponent as ArrowBack } from '../../helpers/icons/arrowBack.svg';
import { ReactComponent as SmileIcon } from '../../helpers/icons/smile.svg';
import styles from './Chat.module.scss';
import { Button } from '../../components/Button/Button';
import { useChat } from '../../hooks/useChat';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import { SocketContext } from '../../helpers/context';
import { Emoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import reactStringReplace from 'react-string-replace';
import { BaseEmoji } from 'emoji-mart';
import { Input } from '../../components/Input/Input';
// import { useScroll } from '../../hooks/usseScroll';

interface IMessage {
  senderName: string;
  receiverName: string;
  receiver: string;
  sender: string;
  message: string;
  date: Date;
  _id: string;
}

export const Chat = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [text, setText] = React.useState<string>('');
  const { sendMessage, messages, bannerData, loadingMessages } = useChat();
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const bottomRef = React.useRef<HTMLParagraphElement | null>(null);
  const socket = React.useContext(SocketContext);
  const queryParams = new URLSearchParams(location.search);
  const chatWith = queryParams.get('with');
  // const { scrollY } = useScroll();

  const addEmoji = (e: BaseEmoji) => {
    setText(text + '' + e.colons);
  };

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
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  React.useEffect(() => {
    socket?.emit('message:read', { userId: user.id, msgSendToUserId: chatWith });
    setTimeout(() => socket?.emit('chat:get', { userId: user.id }), 1000);
  }, [socket]);

  return (
    <>
      <div className={styles.borderTop} />
      <div className={styles.chatWith}>
        <div className={styles.back}>
          <Link to={'/conversations?all=messages'}>
            <ArrowBack /> Назад
          </Link>
        </div>
        <div className={styles.chatWithName}>
          <span className={styles.user}>{bannerData.name}</span>
          <span className={styles.lastVisit}>
            {bannerData.isOnline !== false ? (
              'В сети'
            ) : (
              <span>Был {calculateTime(bannerData.lastVisit)}</span>
            )}
          </span>
        </div>
        <div className={styles.avatar}>
          <img
            src={
              bannerData.avatar == null ? `/photo.png` : `${API_URL}/avatar/${bannerData.avatar}`
            }
            alt={bannerData.name}
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {!loadingMessages ? (
              <div className={styles.chat}>
                {messages.map((m: IMessage, index) => (
                  <div key={index} className={styles.messages}>
                    {user.id == m.sender ? (
                      <>
                        <div className={styles.messageBlock}>
                          <div className={styles.avatar}>
                            <img
                              src={
                                user.avatar === null
                                  ? `/photo.png`
                                  : `${API_URL}/avatar/${user.avatar}`
                              }
                              alt={user.name}
                            />
                            {user.isOnline && <div className={styles.online} />}
                          </div>
                          <div className={styles.name}>
                            <span className={styles.userName}>{user.name}</span>
                            <span className={styles.time}>{calculateTime(m.date)}</span>
                          </div>
                          <span className={styles.text}>
                            {reactStringReplace(m.message, /:(.+?):/g, (match, i) => (
                              <Emoji key={i} emoji={match} set='apple' size={16} native={false} />
                            ))}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.messageBlock}>
                          <Link to={`/main/user-info/${m.receiver}`} className={styles.avatar}>
                            <img
                              src={
                                bannerData.avatar === null
                                  ? `/photo.png`
                                  : `${API_URL}/avatar/${bannerData.avatar}`
                              }
                              alt={bannerData.name}
                            />
                            {bannerData.isOnline && <div className={styles.online} />}
                          </Link>
                          <div className={styles.name}>
                            <span className={styles.userName}>{bannerData.name}</span>
                            <span className={styles.time}>{calculateTime(m.date)}</span>
                          </div>
                          <span className={styles.text}>
                            {reactStringReplace(m.message, /:(.+?):/g, (match, i) => (
                              <Emoji key={i} emoji={match} set='apple' size={16} native={false} />
                            ))}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {/* {scrollY < window.innerHeight && <p ref={bottomRef} />}*/}
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
          {showEmoji && (
            <Picker
              onSelect={addEmoji}
              skin={2}
              theme={'light'}
              perLine={8}
              set={'apple'}
              emojiSize={25}
              i18n={{ categories: { people: 'смайлы', recent: 'недавние' } }}
            />
          )}
          <SmileIcon className={styles.emoji} onClick={() => setShowEmoji(!showEmoji)} />
          <Button appearance='primary' disabled={submitDisabled}>
            <SendIcon className={styles.send} />
          </Button>
        </div>
      </form>
      <div className={styles.borderBottom} />
    </>
  );
};
