import React, { ChangeEvent } from 'react';
import styles from '../Chat.module.scss';
import { Input, Button, EmojiPicker } from '../../../../components/UI';
import { ReactComponent as SendIcon } from '../../../../helpers/icons/send.svg';
import { useChat } from '../../../../hooks/useChat';

export const Form = (): JSX.Element => {
  const [text, setText] = React.useState<string>('');
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const { sendMessage } = useChat();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleSetText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (submitDisabled) return;
    sendMessage(text);
    setText('');
  };

  React.useEffect(() => {
    setSubmitDisabled(!text?.trim());
  }, [text]);

  return (
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
        <EmojiPicker className={styles.emoji} setText={setText} text={text} left={-140} />
        <Button appearance='primary' disabled={submitDisabled}>
          <SendIcon className={styles.send} />
        </Button>
      </div>
    </form>
  );
};
