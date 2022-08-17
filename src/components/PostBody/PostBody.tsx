import React from 'react';
import styles from './PostBody.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';
import { PostBodyProps } from './PostBody.props';

export const PostBody = ({ post }: PostBodyProps): JSX.Element => {
  return (
    <>
      <div className={styles.user}>
        <Link
          to={`/main/profile/${post.user._id}`}
          onClick={() => localStorage.setItem('followId', post.user._id)}
        >
          <img
            src={post.user.avatar === null ? `/photo.png` : `${API_URL}/avatar/${post.user.avatar}`}
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
      {post.image && <img src={`${API_URL}/post/${post.image}`} alt={post.text} />}
    </>
  );
};
