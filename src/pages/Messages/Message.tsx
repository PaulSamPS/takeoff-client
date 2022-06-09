import React, { ChangeEvent } from 'react';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import styles from './Message.module.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useChat } from '../../hooks/useChat';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import cn from 'classnames';
import { calculateTime } from '../../helpers/calculateTime';

interface IMessage {
  senderName: string;
  receiverName: string;
  receiver: string;
  sender: string;
  message: string;
  date: string;
  _id: string;
}

export const Message = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [text, setText] = React.useState<string>('');
  const { sendMessage, messages, bannerData, users } = useChat();
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const bottomRef = React.useRef<HTMLParagraphElement | null>(null);
  const usersOnline = users.map((user: any) => user.userId);

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

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.grid}>
        <div className={styles.chat}>
          {messages.map((m: IMessage, index) => (
            <div key={index} className={styles.messages}>
              <div
                className={cn(
                  m.sender === user.id ? styles.send : styles.receive,
                  styles.messageBlock
                )}
              >
                <div className={styles.user}>
                  <span>{m.sender === user.id ? user.name : bannerData.name}</span>
                  <img
                    src={
                      user.avatar === '' || user.avatar === null
                        ? `/photo.png`
                        : m.sender === user.id
                        ? `${API_URL}/avatar/${user.avatar}`
                        : `${API_URL}/avatar/${bannerData.avatar}`
                    }
                    alt={user.name}
                  />
                  {usersOnline.includes(m.sender) && <div className={styles.online} />}
                </div>
                <p className={styles.text}>{m.message}</p>
              </div>
              <span className={m.sender === user.id ? styles.timeRight : styles.timeLeft}>
                {calculateTime(m.date)}
              </span>
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
