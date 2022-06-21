import React from 'react';
import styles from './Main.module.scss';
import { useAppSelector } from '../hooks/redux';
import { API_URL } from '../http/axios';
import { ReactComponent as FotoIcon } from '../helpers/icons/foto.svg';
import { Button } from '../components/Button/Button';

export const Main = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [active, setActive] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<boolean>(false);
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
          onClick={() => setActive(true)}
        ></div>
        <div className={styles.icons}>
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
    </div>
  );
};
