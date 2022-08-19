import React from 'react';
import { Input, Button } from '../UI';
import { IAppendAvatarInterface } from '../../interfaces/appendAvatar.interface';
import { ModalChangeAvatarProps } from './ModalChangeAvatar.props';
import { useChangeAvatar } from '../../hooks/useChangeAvatar';

import styles from './ModalChangeAvatar.module.scss';
import cn from 'classnames';

export const ModalChangeAvatar = ({ setModal, userId }: ModalChangeAvatarProps): JSX.Element => {
  const { onSubmit, previewAvatar, selectFileAvatar } = useChangeAvatar({ setModal, userId });

  return (
    <form className={styles.append} onSubmit={onSubmit}>
      <div className={styles.top}>Загрузка фотографии</div>
      {previewAvatar.length <= 0 && (
        <div className={styles.body}>
          Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию. Вы можете
          загрузить изображение в формате JPG, GIF или PNG.
          <Input type='file' id='avatar' onChange={selectFileAvatar} className={styles.file} />
          <label htmlFor='avatar'>
            <span
              className={cn(styles.inputBtn, {
                [styles.fileSuccess]: previewAvatar.length > 0,
              })}
            >
              {previewAvatar.length <= 0 ? 'Выберите аватар' : 'Аватар выбран'}
            </span>
          </label>
        </div>
      )}
      <div className={styles.inputFile}>
        {previewAvatar.length > 0 && (
          <div className={styles.previewBlock} id='previewNews'>
            {previewAvatar.map(
              (f: IAppendAvatarInterface, index: number): JSX.Element => (
                <div className={styles.previewImage} key={f.number}>
                  <img src={f.avatar} alt={'image' + index} />
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        {previewAvatar.length > 0 ? (
          <Button appearance='primary' type='submit' className={styles.btn}>
            Загрузить
          </Button>
        ) : (
          <span>
            Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего
            размера.
          </span>
        )}
      </div>
    </form>
  );
};
