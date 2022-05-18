import { useAppDispatch } from './redux';
import { useLocation } from 'react-router-dom';
import { adminRemoveAvatar, removeAvatar, removeUser } from '../redux/actions/usersAction';

interface IRemoveAvatar {
  avatar: string;
  userId: number;
  setModal: (click: boolean) => void;
  setDeleteUser?: (click: boolean) => void;
  deleteUser?: boolean;
}

export const useRemoveAvatar = ({
  avatar,
  userId,
  deleteUser,
  setDeleteUser,
  setModal,
}: IRemoveAvatar): (() => void) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleRemoveAvatar = () => {
    if (deleteUser) {
      dispatch(removeUser(userId, avatar)).then(() => {
        if (setDeleteUser) {
          setDeleteUser(false);
        }
        setModal(false);
      });
    } else {
      if (location.pathname == '/main') {
        dispatch(adminRemoveAvatar(userId, avatar)).then(() => {
          setModal(false);
        });
      } else {
        dispatch(removeAvatar(userId, avatar)).then(() => {
          setModal(false);
        });
      }
    }
  };

  return handleRemoveAvatar;
};
