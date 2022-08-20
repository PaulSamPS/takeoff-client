import React, { ChangeEvent } from 'react';
import { IAppendAvatarInterface } from '../interfaces/appendAvatar.interface';
import { useAppDispatch } from './redux';
import { useParams } from 'react-router-dom';
import { uploadAvatar } from '../redux/actions/usersAction';
import { SocketContext } from '../helpers/socketContext';
import { IUseChangeAvatar, IUseChangeAvatarProps } from '../interfaces/useChangeAvatar.interface';

export const useChangeAvatar = ({ setModal, userId }: IUseChangeAvatarProps): IUseChangeAvatar => {
  const socket = React.useContext(SocketContext);
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendAvatarInterface[]>([]);
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const selectFileAvatar = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const avatar = [] as any[];
    avatar.push({ avatar: URL.createObjectURL(e.target.files![0]), number: Date.now() });
    setPreviewAvatar(avatar);
    setFilesAvatar(e.target.files);
  }, []);

  const onSubmit = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (filesAvatar) {
      formData.append('avatar', filesAvatar[0]);
    } else {
      dispatch(uploadAvatar(userId, formData)).then(() => {
        socket?.emit('userInfo:get', { userId: id });
        setModal(false);
        setFilesAvatar(null);
        setPreviewAvatar([]);
      });
    }
  }, []);

  return { onSubmit, previewAvatar, selectFileAvatar, filesAvatar };
};
