import React, { ChangeEvent, FormEvent } from 'react';
import styles from './Main.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { API_URL } from '../http/axios';
import { ReactComponent as FotoIcon } from '../helpers/icons/foto.svg';
import { Button } from '../components/Button/Button';
import { IAppendAvatarInterface } from '../interfaces/AppendNews.interface';
import { Input } from '../components/Input/Input';
import { createPost, getPosts } from '../redux/actions/postAction';
import { Post } from '../components/Post/Post';
import { Spinner } from '../components/Spinner/Spinner';
import { Picker } from 'emoji-mart';
import { ReactComponent as SmileIcon } from '../helpers/icons/smile.svg';
import { BaseEmoji } from 'emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index';
import 'emoji-mart/css/emoji-mart.css';

export const Main = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const { posts, isLoading } = useAppSelector((state) => state.postsReducer);
  const [active, setActive] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string | null>('');
  const [placeholder, setPlaceholder] = React.useState<string>('Что у вас нового?');
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendAvatarInterface[]>([]);
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const selectFileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = [] as any[];
    avatar.push({ avatar: URL.createObjectURL(e.target.files![0]), number: Date.now() });
    setPreviewAvatar(avatar);
    setFilesAvatar(e.target.files);
    setActive(true);
  };

  const addEmoji = (e: BaseEmoji) => {
    setText(text + '' + e.colons);
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
      setFilesAvatar(null);
      setPreviewAvatar([]);
      setText('');
      setPlaceholder('Что у вас нового?');
      setActive(false);
      document.getElementById('placeholder')!.innerHTML = '';
      dispatch(getPosts(user.id));
    });
  };

  React.useEffect(() => {
    dispatch(getPosts(user.id));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.createPost} onSubmit={onSubmit}>
        <img
          className={styles.avatar}
          src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
          alt={user.name}
        />
        <div
          id='placeholder'
          className={styles.placeholder}
          contentEditable='true'
          placeholder={placeholder}
          role='textbox'
          aria-multiline='true'
          onInput={(e: FormEvent<HTMLDivElement>) => setText(e.currentTarget.textContent)}
          onClick={() => setActive(true)}
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
          <>
            <div className={styles.picker}>
              {showEmoji && (
                <Picker
                  onSelect={addEmoji}
                  skin={2}
                  theme={'light'}
                  perLine={8}
                  set={'apple'}
                  emojiSize={25}
                  i18n={{ categories: { people: 'смайлы', recent: 'недавние' } }}
                  style={{ top: 'unset', right: 'unset', bottom: '-256px', left: '-21px' }}
                />
              )}
              <SmileIcon className={styles.emoji} onClick={() => setShowEmoji(!showEmoji)} />
            </div>
            <Button appearance='primary' type='submit' className={styles.publish}>
              Опубликовать
            </Button>
          </>
        )}
      </form>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
