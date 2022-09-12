import React, { ChangeEvent, useRef } from 'react';
import { API_URL } from '../../../http/axios';
import { Input, Button, EmojiPicker, Spinner } from '../../UI';
import { ReactComponent as PhotoIcon } from '../../../helpers/icons/foto.svg';
import { IAppendAvatarInterface } from '../../../interfaces/appendAvatar.interface';
import { createPost } from '../../../redux/actions/postAction';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useParams } from 'react-router-dom';
import { useOnClickOutside } from '../../../hooks/useOnclickOutside';
import { SocketContext } from '../../../helpers/socketContext';
import { AVATAR_URL } from '../../../helpers/constants';

import { motion } from 'framer-motion';

import styles from './CreateNews.module.scss';

export const CreateNews = () => {
  const socket = React.useContext(SocketContext);
  const { user } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();

  const [active, setActive] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendAvatarInterface[]>([]);
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(true);
  const [upload, setUpload] = React.useState<boolean>(false);

  const ref = useRef<HTMLFormElement>(null);
  useOnClickOutside(ref, () => setActive(false));
  const { id } = useParams();

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
    setUpload(true);
    const formData = new FormData();
    if (filesAvatar) {
      formData.append('image', filesAvatar[0]);
    } else {
      formData.append('image', null as unknown as Blob);
    }
    if (text !== null) {
      formData.append('text', text);
    } else {
      formData.append('text', null as unknown as Blob);
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
      setUpload(false);
      setActive(false);
    });
  };

  React.useEffect(() => {
    setActive(false);
  }, [id]);

  return (
    <>
      {upload ? (
        <Spinner />
      ) : (
        <form className={styles.createPost} onSubmit={onSubmit} ref={ref}>
          <img
            className={styles.avatar}
            src={user.avatar == null ? `/photo.png` : `${API_URL}/${AVATAR_URL}/${user.avatar}`}
            alt={user.name.firstName + ' ' + user.name.lastName}
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
              <PhotoIcon />
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
              <EmojiPicker setText={setText} text={text} left={-21} />
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
      )}
    </>
  );
};
