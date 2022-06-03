import React, { ChangeEvent } from 'react';
import { UserProps } from './User.props';
import { API_URL } from '../../http/axios';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ReactComponent as ChatIcon } from '../../helpers/icons/chat.svg';
import { ReactComponent as EditIcon } from '../../helpers/icons/more.svg';
import { ReactComponent as CloseIcon } from '../../helpers/icons/close.svg';
import { ReactComponent as DeleteIcon } from '../../helpers/icons/delete.svg';
import styles from './User.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { EditProfile } from '../EditProfile/EditProfile';
import { ReactComponent as AddAvatarIcon } from '../../helpers/icons/addAvatar.svg';
import { ReactComponent as DeleteAvatarIcon } from '../../helpers/icons/deleteAvatar.svg';
import { ChangeAvatar } from '../ChangeAvatar/ChangeAvatar';
import { Modal } from '../Modal/Modal';
import { RemoveAvatar } from '../RemoveAvatar/RemoveAvatar';
import { Input } from '../Input/Input';
import { useChat } from '../../hooks/useChat';
import { Button } from '../Button/Button';
import { getConversations } from '../../redux/actions/chatAction';

export const User = ({ user }: UserProps): JSX.Element => {
  const { role, id } = useAppSelector((state) => state.loginReducer.user);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const [conversationModal, setConversationModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);
  const [deleteUser, setDeleteUser] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const dispatch = useAppDispatch();
  const { sendMessage } = useChat();

  const handleDelete = () => {
    setDeleteUser(true);
    setRemoveAvatarModal(true);
  };

  const navigateToChat = (id: string) => {
    localStorage.setItem('id', id);
    setConversationModal(true);
  };

  const onSubmit = async () => {
    if (submitDisabled) return;
    sendMessage(text);
    setText('');
  };

  React.useEffect(() => {
    setSubmitDisabled(!text.trim());
  }, [text]);

  React.useEffect(() => {
    dispatch(getConversations(id));
  }, []);

  return (
    <>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className={styles.avatar}>
          <div className={styles.img}>
            <img
              src={user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
              alt={user.name}
            />
          </div>
          {role === 'admin' && user.avatar == null && (
            <div className={styles.uploadAvatar} onClick={() => setModal(true)}>
              <AddAvatarIcon />
            </div>
          )}
          {role === 'admin' && user.avatar != null && (
            <div className={styles.uploadAvatar} onClick={() => setRemoveAvatarModal(true)}>
              <DeleteAvatarIcon />
            </div>
          )}
        </div>
        {user._id != id && (
          <ChatIcon className={styles.chat} onClick={() => navigateToChat(user._id)} />
        )}
        <div className={styles.info}>
          <label>
            Логин:
            <span onClick={() => console.log(user._id)}>{user.name}</span>
          </label>
          <label>
            Email:
            <span>{user.email}</span>
          </label>
        </div>
        <div className={styles.position}>
          <label>
            Позиция:
            <span>{user.position}</span>
          </label>
          <label>
            Уровень:
            <span>{user.level}</span>
          </label>
        </div>
        <AnimatePresence>
          {edit && (
            <EditProfile
              adminUser={user._id}
              className={styles.editProfile}
              isOpen={edit}
              setIsOpen={setEdit}
            />
          )}
        </AnimatePresence>
        {role === 'admin' && id != user._id && (
          <div className={styles.settingsBlock}>
            <DeleteIcon className={styles.delete} onClick={handleDelete} />
            {edit ? (
              <CloseIcon className={styles.edit} onClick={() => setEdit(false)} />
            ) : (
              <EditIcon className={styles.edit} onClick={() => setEdit(true)} />
            )}
          </div>
        )}
      </motion.div>
      <Modal setModal={setModal} modal={modal}>
        <ChangeAvatar setModal={setModal} userId={user._id} />
      </Modal>
      <RemoveAvatar
        avatar={user.avatar}
        modal={removeAvatarModal}
        setModal={setRemoveAvatarModal}
        userId={user._id}
        deleteUser={deleteUser}
        setDeleteUser={setDeleteUser}
      />
      <Modal setModal={setConversationModal} modal={conversationModal}>
        <Input
          placeholder='Введите сообщение...'
          autoFocus
          onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          value={text}
        />
        <Button appearance='primary' disabled={submitDisabled} onClick={onSubmit}>
          Отправить
        </Button>
      </Modal>
    </>
  );
};
