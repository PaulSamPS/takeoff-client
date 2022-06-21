import React, { FormEvent } from 'react';
import styles from './Main.module.scss';
import { useAppSelector } from '../hooks/redux';
import { API_URL } from '../http/axios';
import { ReactComponent as FotoIcon } from '../helpers/icons/foto.svg';
import { Button } from '../components/Button/Button';
import { Modal } from '../components/Modal/Modal';

export const Main = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [active, setActive] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string | null>('');

  console.log(text);
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
        <div className={styles.icons} onClick={() => setModal(true)}>
          <FotoIcon />
        </div>
        {image && (
          <div className={styles.postImage}>
            <img src={'/photo.png'} alt={user.name} />
          </div>
        )}
        {active && (
          <Button appearance='primary' onClick={() => setImage(!image)}>
            Опубликовать
          </Button>
        )}
      </div>
      <Modal setModal={setModal} modal={modal}>
        {' '}
        123
      </Modal>
    </div>
  );
};
