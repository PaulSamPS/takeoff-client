import React, { ChangeEvent } from 'react';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import styles from './Message.module.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useChat } from '../../hooks/useChat';
import 'moment/locale/ru';
import moment from 'moment';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/axios';
import cn from 'classnames';

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
  const { sendMessage, messages, bannerData } = useChat();
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  // иммутабельная ссылка на инпут для ввода текста сообщения
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  moment.locale('ru');
  const bottomRef = React.useRef<HTMLParagraphElement | null>(null);
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
              {user.id == m.sender ? (
                <>
                  <div className={cn(styles.send, styles.messageBlock)}>
                    <div className={styles.user}>
                      <span>{user.name}</span>
                      <img
                        src={
                          user.avatar === '' || user.avatar === null
                            ? `/photo.png`
                            : `${API_URL}/avatar/${user.avatar}`
                        }
                        alt={user.name}
                      />
                    </div>
                    <p className={styles.text}>{m.message}</p>
                  </div>
                  <span className={styles.timeRight}>{moment(m.date).fromNow()}</span>
                </>
              ) : (
                <>
                  <div className={cn(styles.receive, styles.messageBlock)}>
                    <div className={styles.user}>
                      <img
                        src={
                          bannerData.avatar === '' || bannerData.avatar === null
                            ? `/photo.png`
                            : `${API_URL}/avatar/${bannerData.avatar}`
                        }
                        alt={bannerData.name}
                      />
                      <span>{bannerData.name}</span>
                    </div>
                    <p className={styles.text}>{m.message}</p>
                  </div>
                  <span className={styles.timeLeft}>{moment(m.date).fromNow()}</span>
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
