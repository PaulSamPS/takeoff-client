import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../http/axios';
import { calculateTime } from '../../../../../helpers/calculateTime';
import reactStringReplace from 'react-string-replace';
import { ReactComponent as MoreIcon } from '../../../../../helpers/icons/more.svg';
import { usePost } from '../../../../../hooks/usePost';
import { useAppSelector } from '../../../../../hooks/redux';
import { NewsItemBodyProps } from './Body.props';
import { AVATAR_URL, POST_IMAGE_URL } from '../../../../../helpers/constants';

import { Emoji } from 'emoji-mart';

import styles from './Body.module.scss';

export const NewsItemBody = ({ post, hoverPost }: NewsItemBodyProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);

  const { handleDeletePost } = usePost(post);

  return (
    <>
      {post.user._id === loginUser.id && hoverPost && (
        <div className={styles.more}>
          <MoreIcon />
          <div className={styles.moreOptions}>
            <div onClick={handleDeletePost}>Удалить</div>
          </div>
        </div>
      )}
      <div className={styles.user}>
        <Link
          to={`/main/profile/${post.user._id}`}
          onClick={() => localStorage.setItem('followId', post.user._id)}
        >
          <img
            src={
              post.user.avatar === null
                ? `/photo.png`
                : `${API_URL}/${AVATAR_URL}/${post.user.avatar}`
            }
            alt={post.user.name.firstName + ' ' + post.user.name.lastName}
          />
        </Link>
        <div className={styles.userPost}>
          <Link
            to={`/main/profile/${post.user._id}`}
            className={styles.userName}
            onClick={() => localStorage.setItem('followId', post.user._id)}
          >
            {post.user.name.firstName + ' ' + post.user.name.lastName}
          </Link>
          <span className={styles.date}>{calculateTime(post.createdAt)}</span>
        </div>
      </div>
      <span className={styles.text}>
        {reactStringReplace(post.text, /:(.+?):/g, (match, i) => (
          <Emoji key={i} emoji={match} set='apple' size={16} native={false} />
        ))}
      </span>
      {post.image && <img src={`${API_URL}/${POST_IMAGE_URL}/${post.image}`} alt={post.text} />}
    </>
  );
};
