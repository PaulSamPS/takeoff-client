import React, { ChangeEvent } from 'react';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import styles from './Message.module.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useParams } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import { useAppSelector } from '../../hooks/redux';
import 'moment/locale/ru';
import moment from 'moment';

interface IMessage {
  text: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export const Message = (): JSX.Element => {
  const { name } = useParams();
  const { messages, sendMessage } = useChat(name);
  const { user } = useAppSelector((state) => state.loginReducer);
  const [text, setText] = React.useState<string>('');
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  // иммутабельная ссылка на инпут для ввода текста сообщения
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const roomId = `23242`;
  moment.locale('ru');
  const bottomRef = React.useRef<HTMLParagraphElement | null>(null);

  React.useEffect(() => {
    setSubmitDisabled(!text.trim());
  }, [text]);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (submitDisabled) return;
    // извлекаем данные пользователя и формируем начальное сообщение
    const message = {
      userId: user.id,
      userName: user.name,
      roomId: roomId,
      text: text,
    };
    // отправляем сообщение
    sendMessage(message);
    // сбрасываем состояние
    setText('');
  };

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <h2>{name}</h2>
      <form onSubmit={onSubmit} className={styles.grid}>
        <div className={styles.sidebar}>left</div>
        <div className={styles.chat}>
          {messages.map((m: IMessage, index) => (
            <div key={index} className={styles.messages}>
              {user.name == m.userName ? (
                <>
                  <div className={styles.send}>
                    <span className={styles.userName}>{m.userName}</span>
                    <p className={styles.text}>{m.text}</p>
                  </div>
                  <span className={styles.timeRight}>{moment(m.createdAt).fromNow()}</span>
                </>
              ) : (
                <>
                  <div className={styles.receive}>
                    <span className={styles.userName}>{m.userName}</span>
                    <p className={styles.text}>{m.text}</p>
                  </div>
                  <span className={styles.timeLeft}>{moment(m.createdAt).fromNow()}</span>
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
