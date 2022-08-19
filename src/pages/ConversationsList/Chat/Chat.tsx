import React from 'react';
import { ReactComponent as ArrowBack } from '../../../helpers/icons/arrowBack.svg';
import styles from './Chat.module.scss';
import { useChat } from '../../../hooks/useChat';
import { useAppSelector } from '../../../hooks/redux';
import { API_URL } from '../../../http/axios';
import { calculateTime } from '../../../helpers/calculateTime';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { SocketContext } from '../../../helpers/socketContext';
import 'emoji-mart/css/emoji-mart.css';
import { ChatMessages } from '../../../components/ChatMessage/ChatMessages';
import {ChatForm} from './Form/Form';

export const ConversationsListChat = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);

  const { bannerData, loadingMessages, messages, deleteMessage } = useChat();

  const onlineUser = users.map((u) => u.userId);

  const { id } = useParams();

  React.useEffect(() => {
    socket?.emit('message:read', { userId: loginUser.id, msgSendToUserId: id });
    setTimeout(() => socket?.emit('chat:get', { userId: loginUser.id }), 1000);
  }, [socket]);

  return (
    <>
      <div className={styles.borderTop} />
      <div className={styles.chatWith}>
        <div className={styles.back}>
          <Link to={'/main/conversations'}>
            <ArrowBack /> Назад
          </Link>
        </div>
        <div className={styles.chatWithName}>
          <span className={styles.user}>{bannerData.name}</span>
          <span className={styles.lastVisit}>
            {onlineUser.includes(id) ? (
              'В сети'
            ) : (
              <span>
                {bannerData.bio.gender === 'Мужской' ? 'был' : 'была'}{' '}
                {calculateTime(bannerData.lastVisit)}
              </span>
            )}
          </span>
        </div>
        <Link to={`/main/profile/${id}`} className={styles.avatar}>
          <img
            src={
              bannerData.avatar == null ? `/photo.png` : `${API_URL}/avatar/${bannerData.avatar}`
            }
            alt={bannerData.name}
          />
        </Link>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {!loadingMessages ? (
              <div className={styles.chat}>
                {messages.map((message) => (
                  <ChatMessages
                    key={message._id}
                    message={message}
                    bannerData={bannerData}
                    deleteMessage={deleteMessage}
                  />
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
      <ChatForm/>
      <div className={styles.borderBottom} />
    </>
  );
};
