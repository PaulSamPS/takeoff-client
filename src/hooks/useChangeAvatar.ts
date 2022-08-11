import React, { ChangeEvent, SyntheticEvent } from 'react';
import { IAppendAvatarInterface } from '../interfaces/appendAvatar.interface';
import { useAppDispatch } from './redux';
import { useLocation, useParams } from 'react-router-dom';
import { adminUploadAvatar, uploadAvatar } from '../redux/actions/usersAction';
import { SocketContext } from '../helpers/context';

interface IUseChangeAvatarProps {
  setModal: (click: boolean) => void;
  userId: string;
}

interface IUseChangeAvatar {
  onSubmit: (e: SyntheticEvent) => void;
  previewAvatar: IAppendAvatarInterface[];
  selectFileAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
  filesAvatar: FileList | null;
}

export const useChangeAvatar = ({ setModal, userId }: IUseChangeAvatarProps): IUseChangeAvatar => {
  const socket = React.useContext(SocketContext);
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendAvatarInterface[]>([]);
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();

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
    if (location.pathname == '/main') {
      dispatch(adminUploadAvatar(userId, formData)).then(() => {
        setModal(false);
        setFilesAvatar(null);
        setPreviewAvatar([]);
      });
    } else {
      dispatch(uploadAvatar(userId, formData)).then(() => {
        socket?.emit('userInfo:get', { userId: id });
        setModal(false);
        setFilesAvatar(null);
        setPreviewAvatar([]);
      });
    }
  };

  return { onSubmit, previewAvatar, selectFileAvatar, filesAvatar };
};
