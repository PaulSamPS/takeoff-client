import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Emoji } from 'emoji-mart';
import { ChatMessagesProps } from './ChatMessages.props';
import { useAppSelector } from '../../hooks/redux';
import { ReactComponent as DeleteIcon } from '../../helpers/icons/close.svg';
import { AVATAR_URL } from '../../helpers/constants';

import reactStringReplace from 'react-string-replace';

import styles from './ChatMessages.module.scss';

export const ChatMessages = ({ message, bannerData, deleteMessage }: ChatMessagesProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const [isDeleteMessage, setIsDeleteMessage] = React.useState<boolean>(false);
  const { id } = useParams();

  const ownMessage = loginUser.id === message.sender;

  React.useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [id]);

  return (
    <>
      <div
        className={styles.messages}
        onMouseEnter={() => setIsDeleteMessage(true)}
        onMouseLeave={() => setIsDeleteMessage(false)}
      >
        <div className={styles.messageBlock}>
          {ownMessage && (
            <>
              {isDeleteMessage && (
                <DeleteIcon
                  className={styles.deleteIcon}
                  onClick={() => deleteMessage(message._id)}
                />
              )}
            </>
          )}
          <Link
            to={`/main/profile/${ownMessage ? loginUser.id : id}`}
            className={styles.avatar}
            onClick={() => localStorage.setItem('followId', ownMessage ? loginUser.id : id!)}
          >
            <img
              src={
                ownMessage
                  ? loginUser.avatar == null
                    ? `/photo.png`
                    : `${API_URL}/${AVATAR_URL}/${loginUser.avatar}`
                  : bannerData.avatar == null
                  ? `/photo.png`
                  : `${API_URL}/${AVATAR_URL}/${bannerData.avatar}`
              }
              alt={
                ownMessage
                  ? loginUser.name.firstName + ' ' + loginUser.name.lastName
                  : bannerData.name
              }
            />
          </Link>
          <div className={styles.name}>
            <Link
              to={`/main/profile/${ownMessage ? loginUser.id : id}`}
              className={styles.userName}
              onClick={() => localStorage.setItem('followId', ownMessage ? loginUser.id : id!)}
            >
              {ownMessage
                ? loginUser.name.firstName + ' ' + loginUser.name.lastName
                : bannerData.name}
            </Link>
            <span className={styles.time}>{calculateTime(message.date)}</span>
          </div>
          <span className={styles.text}>
            {reactStringReplace(message.message, /:(.+?):/g, (match, i) => (
              <Emoji key={i} emoji={match} set='apple' size={16} native={false} />
            ))}
          </span>
        </div>
      </div>
    </>
  );
};
