import React, { ChangeEvent } from 'react';
import { Input } from '../../../components/Input/Input';
import styles from './ChangeAvatar.module.scss';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { IAppendAvatarInterface } from '../../../interfaces/AppendNews.interface';

export const ChangeAvatar = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendAvatarInterface[]>([]);
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);

  const selectFileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = [] as any[];
    avatar.push({ avatar: URL.createObjectURL(e.target.files![0]), number: Date.now() });
    setPreviewAvatar(avatar);
    setFilesAvatar(e.target.files);
  };

  const onSubmit = () => {
    const formData = new FormData();
    if (filesAvatar) {
      formData.append('avatar', filesAvatar[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.append}>
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
        <label htmlFor='avatar'>
          Изображение:
          <Input
            {...register('avatar', { required: { value: true, message: 'Выберите изображение' } })}
            placeholder='Выберите изображение'
            type='file'
            id='avatar'
            error={errors.img}
            onChange={selectFileAvatar}
            className={styles.file}
          />
          <label htmlFor='avatar'>
            <span
              className={cn(styles.inputBtn, {
                [styles.fileSuccess]: previewAvatar.length > 0,
              })}
            >
              {previewAvatar.length <= 0 ? 'Выберите аватар' : 'Аватар выбран'}
            </span>
          </label>
        </label>
      </div>
    </form>
  );
};
