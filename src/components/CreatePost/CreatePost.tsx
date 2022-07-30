import React, { ChangeEvent, useRef } from 'react';
import styles from './CreatePost.module.scss';
import { API_URL } from '../../http/axios';
import { Input } from '../UI/Input/Input';
import { ReactComponent as FotoIcon } from '../../helpers/icons/foto.svg';
import { IAppendAvatarInterface } from '../../interfaces/AppendNews.interface';
import { motion } from 'framer-motion';
import { Button } from '../UI/Button/Button';
import { createPost } from '../../redux/actions/postAction';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';
import { EmojiPicker } from '../UI/EmojiPicker/EmojiPicker';
import { SocketContext } from '../../helpers/context';

export const CreatePost = () => {
  const socket = React.useContext(SocketContext);
  const { user } = useAppSelector((state) => state.loginReducer);
  const [active, setActive] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendAvatarInterface[]>([]);
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const ref = useRef<HTMLFormElement>(null);
  useOnClickOutside(ref, () => setActive(false));

  console.log(filesAvatar, submitDisabled);

  React.useEffect(() => {
    setSubmitDisabled(!text?.trim());
  }, [text]);

  const variantsOpen = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  };

  const selectFileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = [] as any[];
    avatar.push({ avatar: URL.createObjectURL(e.target.files![0]), number: Date.now() });
    setPreviewAvatar(avatar);
    setFilesAvatar(e.target.files);
    setActive(true);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (filesAvatar) {
      formData.append('image', filesAvatar[0]);
    } else {
      formData.append('image', null as unknown as Blob);
    }
    if (text !== null) {
      formData.append('text', text);
    }
    formData.append('id', user.id);
    const obj = {
      image: filesAvatar && filesAvatar[0],
      text: text,
      id: user.id,
    };
    dispatch(createPost(filesAvatar === null ? obj : formData)).then(() => {
      socket?.emit('post:get', { userId: user.id });
      setFilesAvatar(null);
      setPreviewAvatar([]);
      setText('');
      setActive(false);
    });
  };

  React.useEffect(() => {
    setActive(false);
  }, [id]);

  return (
    <form className={styles.createPost} onSubmit={onSubmit} ref={ref}>
      <img
        className={styles.avatar}
        src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
        alt={user.firstName + ' ' + user.lastName}
      />
      <textarea
        className={styles.textarea}
        placeholder='Что у вас нового?'
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        onClick={() => setActive(true)}
        value={text}
      />
      <div className={styles.icons}>
        <Input type='file' id='avatar' onChange={selectFileAvatar} className={styles.file} />
        <label htmlFor='avatar'>
          <FotoIcon />
        </label>
      </div>
      {previewAvatar &&
        previewAvatar.map(
          (f: IAppendAvatarInterface, index: number): JSX.Element => (
            <div className={styles.postImage} key={f.number}>
              <img src={f.avatar} alt={'image' + index} />
            </div>
          )
        )}
      {active && (
        <motion.div
          className={styles.openBlock}
          animate={active ? 'open' : 'closed'}
          initial={'closed'}
          exit={'closed'}
          variants={variantsOpen}
          transition={{
            damping: 20,
            type: 'spring',
            stiffness: 260,
            duration: 0.2,
          }}
        >
          <EmojiPicker setText={setText} text={text} bottom={-255} left={-21} />
          <Button
            appearance='primary'
            type='submit'
            className={styles.publish}
            disabled={previewAvatar.length <= 0 && submitDisabled}
          >
            Опубликовать
          </Button>
        </motion.div>
      )}
    </form>
  );
};
