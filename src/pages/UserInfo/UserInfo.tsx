import React, { ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import styles from './UserInfo.module.scss';
import { socket } from '../../helpers/socket';
import { calculateTime } from '../../helpers/calculateTime';
import { IUser, IUserAll } from '../../interfaces/user.interface';
import { API_URL } from '../../http/axios';
import { Info } from '../../components/Info/Info';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../../components/Input/Input';
import { useAppSelector } from '../../hooks/redux';
import { ChangeAvatar } from '../../components/ChangeAvatar/ChangeAvatar';
import { RemoveAvatar } from '../../components/RemoveAvatar/RemoveAvatar';
import { useFollow } from '../../hooks/useFollow';
import { useRequest } from '../../hooks/useRequest';

interface IUserInfo {
  user: IUserAll;
}

export const UserInfo = () => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users, sendMessage } = useChat();
  const { id } = useParams();
  const [user, setUser] = React.useState<IUserAll | IUser>();
  const usersOnline = users.map((user: any) => user.userId);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [conversationModal, setConversationModal] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [modal, setModal] = React.useState<boolean>(false);
  const [removeAvatarModal, setRemoveAvatarModal] = React.useState<boolean>(false);
  const { followings, handleFollow, handleUnfollow } = useFollow(id);
  const { friendsUserInfo } = useRequest();
  // const friendsDone = friends && friends.map((friend) => friend.id);
  // const requestsDone = request.map((request) => request.id);
  // const followingDone = followings.map((following) => following.id);

  const sendMessageModal = () => {
    if (typeof id === 'string') {
      localStorage.setItem('id', id);
    }
    setConversationModal(true);
  };

  const onSubmit = () => {
    if (submitDisabled) return;
    sendMessage(text);
    setText('');
    setConversationModal(false);
  };

  React.useEffect(() => {
    setSubmitDisabled(!text.trim());
  }, [text]);

  React.useEffect(() => {
    socket.emit('userInfo:get', { userId: id });
    socket.on('userInfo:user', ({ user }: IUserInfo) => {
      setUser(user);
    });
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <img
            src={user?.avatar == null ? `/photo.png` : `${API_URL}/avatar/${user.avatar}`}
            alt={user?.name}
          />
        </div>
        <div className={styles.bio}>
          {usersOnline.includes(id) ? (
            <div className={styles.online}>
              Online <div className={styles.green} />
            </div>
          ) : (
            <div className={styles.lastVisit}>
              Был(а) в сети {user && calculateTime(user.lastVisit)}
            </div>
          )}
          <h1>{user?.name}</h1>
          <Info user={user} />
        </div>
        {loginUser.id !== id && (
          <Button
            appearance='primary'
            className={styles.message}
            onClick={() => sendMessageModal()}
          >
            Написать
          </Button>
        )}
        {/* {!friendsDone.includes(id) ? (*/}
        {/*  <div className={styles.follow}>*/}
        {/*    {!followingDone.includes(id) && requestsDone.includes(id) ? (*/}
        {/*      <Button appearance='primary' onClick={() => addFriend(id)}>*/}
        {/*        Добавить в друзья*/}
        {/*      </Button>*/}
        {/*    ) : followings.find((i) => i.id === loginUser.id) ? (*/}
        {/*      <Button appearance='primary' onClick={handleUnfollow}>*/}
        {/*        Отписаться*/}
        {/*      </Button>*/}
        {/*    ) : (*/}
        {/*      <Button appearance='primary' onClick={handleFollow}>*/}
        {/*        Подписаться*/}
        {/*      </Button>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/* ) : (*/}
        {/*  <div className={styles.follow}>*/}
        {/*    <Button appearance='primary'>Удалить из друзей</Button>*/}
        {/*  </div>*/}
        {/* )}*/}
        <div className={styles.follow}>
          {followings && followings.find((i) => i.id === loginUser.id) ? (
            <Button appearance='primary' onClick={handleUnfollow}>
              Отписаться
            </Button>
          ) : (
            <Button appearance='primary' onClick={handleFollow}>
              Подписаться
            </Button>
          )}
        </div>
        <div className={styles.followersWrapper}>
          <div className={styles.name}>
            Друзья {friendsUserInfo && friendsUserInfo.length > 0 ? friendsUserInfo.length : 0}
          </div>
          <div className={styles.grid}>
            {friendsUserInfo &&
              friendsUserInfo.map((f) => (
                <Link
                  to={`/main/user-info/${f.id}`}
                  replace
                  key={f.id}
                  className={styles.followers}
                >
                  <img
                    src={f.avatar == null ? `/photo.png` : `${API_URL}/avatar/${f.avatar}`}
                    alt={f.name}
                  />
                  {usersOnline.includes(f.id) && <div className={styles.onlineStatus} />}
                </Link>
              ))}
          </div>
        </div>
      </div>
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
      <Modal setModal={setModal} modal={modal}>
        <ChangeAvatar setModal={setModal} userId={loginUser.id} />
      </Modal>
      <RemoveAvatar
        avatar={loginUser.avatar}
        modal={removeAvatarModal}
        setModal={setRemoveAvatarModal}
        userId={loginUser.id}
      />
    </div>
  );
};
