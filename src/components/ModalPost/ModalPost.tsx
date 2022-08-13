import React, { ChangeEvent } from 'react';
import styles from './ModalPost.module.scss';
import { ModalPostProps } from './ModalPost.props';
import { API_URL } from '../../http/axios';
import { Link } from 'react-router-dom';
import { calculateTime } from '../../helpers/calculateTime';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';
import { EmojiPicker } from '../UI/EmojiPicker/EmojiPicker';
import { Button } from '../UI/Button/Button';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import { usePost } from '../../hooks/usePost';

export const ModalPost = ({ post }: ModalPostProps): JSX.Element => {
  const { handleComment, setText, text } = usePost(post);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img
          src={`${API_URL}/post/${post.image}`}
          alt={post.user.firstName + '' + post.user.lastName}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <Link
            to={`/main/profile/${post.user._id}`}
            className={styles.avatar}
            onClick={() => localStorage.setItem('followId', post.user._id)}
          >
            <img
              src={
                post.user.avatar == null ? `/photo.png` : `${API_URL}/avatar/${post.user.avatar}`
              }
              alt={post.user.firstName + '' + post.user.lastName}
            />
          </Link>
          <div className={styles.userInfo}>
            <Link
              to={`/main/profile/${post.user._id}`}
              onClick={() => localStorage.setItem('followId', post.user._id)}
            >
              {post.user.firstName + ' ' + post.user.lastName}
            </Link>
            <span className={styles.date}>{calculateTime(post.createdAt)}</span>
          </div>
        </div>
        <div className={styles.middle}>
          {post.comments.length > 0 &&
            post.comments.slice(-4).map((comment) => (
              <div className={styles.comment} key={comment._id}>
                <img
                  src={
                    comment.user.avatar == null
                      ? `/photo.png`
                      : `${API_URL}/avatar/${comment.user.avatar}`
                  }
                  alt={comment.user.firstName + ' ' + comment.user.lastName}
                />
                <div className={styles.commentInfo}>
                  <Link to={`/main/profile/${comment.user._id}`}>
                    {comment.user.firstName + ' ' + comment.user.lastName}
                  </Link>
                  <span className={styles.text}>
                    {reactStringReplace(comment.text, /:(.+?):/g, (match, i) => (
                      <Emoji key={i} emoji={match} set='apple' size={16} native={false} />
                    ))}
                  </span>
                  <span className={styles.dateComment}>{calculateTime(comment.date)}</span>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.sendComment}>
          <input
            className={styles.input}
            placeholder='Написать комментарий...'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            value={text!}
          />
          <EmojiPicker setText={setText} text={text!} bottom={-255} left={-156} />
          <Button
            appearance='primary'
            disabled={!(text && text.length > 0)}
            onClick={handleComment}
          >
            <SendIcon className={styles.send} />
          </Button>
        </div>
      </div>
    </div>
  );
};
