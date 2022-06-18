import React, { ChangeEvent } from 'react';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import styles from './Message.module.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useChat } from '../../hooks/useChat';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Link, useParams } from 'react-router-dom';
import { setMessagesRead } from '../../redux/actions/chatAction';

interface IMessage {
  senderName: string;
  receiverName: string;
  receiver: string;
  sender: string;
  message: string;
  date: Date;
  _id: string;
}

export const Message = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [text, setText] = React.useState<string>('');
  const { sendMessage, messages, bannerData, users, deleteMessage } = useChat();
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const bottomRef = React.useRef<HTMLParagraphElement | null>(null);
  const usersOnline = users.map((user: any) => user.userId);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setSubmitDisabled(!text.trim());
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
    dispatch(setMessagesRead(user.id, id));
  }, []);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.grid}>
        <div className={styles.chat}>
          {messages.map((m: IMessage, index) => (
            <div key={index} className={styles.messages} onClick={() => deleteMessage(m._id)}>
              {user.id == m.sender ? (
                <>
                  <div className={styles.messageBlock}>
                    <div className={styles.avatar}>
                      <img
                        src={
                          user.avatar === null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`
                        }
                        alt={user.name}
                      />
                      {usersOnline.includes(m.sender) && <div className={styles.online} />}
                    </div>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.time}>{calculateTime(m.date)}</span>
                    <p className={styles.text}>{m.message}</p>
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
                      {usersOnline.includes(m.sender) && <div className={styles.online} />}
                    </Link>
                    <span className={styles.userName}>{bannerData.name}</span>
                    <span className={styles.time}>{calculateTime(m.date)}</span>
                    <p className={styles.text}>{m.message}</p>
                  </div>
                </>
              )}
              <p ref={bottomRef} />
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <Input
            placeholder='Введите сообщение...'
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            value={text}
            ref={inputRef}
          />
          <Button appearance='primary' disabled={submitDisabled}>
            <SendIcon className={styles.send} />
          </Button>
        </div>
      </form>
    </div>
  );
};
