import React, { ChangeEvent } from 'react';
import { Input } from '../../../components/Input/Input';
import styles from './ChangeAvatar.module.scss';
import cn from 'classnames';
import { IAppendAvatarInterface } from '../../../interfaces/AppendNews.interface';
import { Button } from '../../../components/Button/Button';
import { ChangeAvatarProps } from './ChangeAvatar.props';
import { useAppDispatch } from '../../../hooks/redux';
import { uploadAvatar } from '../../../redux/actions/usersAction';

export const ChangeAvatar = ({ setModal, userId }: ChangeAvatarProps): JSX.Element => {
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendAvatarInterface[]>([]);
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);
  const dispatch = useAppDispatch();

  const selectFileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = [] as any[];
    avatar.push({ avatar: URL.createObjectURL(e.target.files![0]), number: Date.now() });
    setPreviewAvatar(avatar);
    setFilesAvatar(e.target.files);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (filesAvatar) {
      formData.append('avatar', filesAvatar[0]);
    }
    dispatch(uploadAvatar(userId, formData)).then(() => {
      setModal(false);
      setFilesAvatar(null);
      setPreviewAvatar([]);
    });
  };

  return (
    <form className={styles.append} onSubmit={onSubmit}>
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
      {previewAvatar.length > 0 && (
        <Button appearance='primary' type='submit' className={styles.btn}>
          Загрузить
        </Button>
      )}
    </form>
  );
};
