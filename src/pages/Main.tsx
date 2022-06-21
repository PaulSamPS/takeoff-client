import React, { ChangeEvent, FormEvent } from 'react';
import styles from './Main.module.scss';
import { useAppSelector } from '../hooks/redux';
import { API_URL } from '../http/axios';
import { ReactComponent as FotoIcon } from '../helpers/icons/foto.svg';
import { Button } from '../components/Button/Button';
import { IAppendAvatarInterface } from '../interfaces/AppendNews.interface';
import { Input } from '../components/Input/Input';

export const Main = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [active, setActive] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string | null>('');
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendAvatarInterface[]>([]);
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);

  const selectFileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = [] as any[];
    avatar.push({ avatar: URL.createObjectURL(e.target.files![0]), number: Date.now() });
    setPreviewAvatar(avatar);
    setFilesAvatar(e.target.files);
    setActive(true);
  };

  console.log(text, filesAvatar);
  return (
    <div className={styles.wrapper}>
      <div className={styles.createPost}>
        <img
          className={styles.avatar}
          src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
          alt={user.name}
        />
        <div
          className={styles.placeholder}
          contentEditable='true'
          placeholder={'Что у вас нового?'}
          role='textbox'
          aria-multiline='true'
          onInput={(e: FormEvent<HTMLDivElement>) => setText(e.currentTarget.textContent)}
          onClick={() => setActive(true)}
        ></div>
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
        {active && <Button appearance='primary'>Опубликовать</Button>}
      </div>
    </div>
  );
};
