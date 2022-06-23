import React from 'react';
import { PostProps } from './Post.props';
import { API_URL } from '../../http/axios';
import styles from './Post.module.scss';
import { ReactComponent as CommentIcon } from '../../helpers/icons/comment.svg';
import { ReactComponent as LikesIcon } from '../../helpers/icons/like.svg';
import cn from 'classnames';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import { Button } from '../Button/Button';
import { calculateTime } from '../../helpers/calculateTime';

export const Post = ({ post }: PostProps) => {
  const [like, setLike] = React.useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <img
          src={post.user.avatar === null ? `/photo.png` : `${API_URL}/avatar/${post.user.avatar}`}
          alt={post.user.name}
        />
        <div>
          <span>{post.user.name}</span>
          <span>{calculateTime(post.createdAt)}</span>
        </div>
      </div>
      <span className={styles.text}>{post.text}</span>
      {post.image && <img src={`${API_URL}/post/${post.image}`} alt={post.text} />}
      <div className={styles.icons}>
        <div className={styles.iconBg} onClick={() => setLike(!like)}>
          <div
            className={cn(styles.icon, {
              [styles.likeBackgroundImage]: like,
            })}
          >
            <LikesIcon />
          </div>
          <span className={styles.count}>13</span>
        </div>
        <div className={styles.iconBg}>
          <div className={styles.icon}>
            <CommentIcon />
          </div>
          <span className={styles.count}>7</span>
        </div>
      </div>
      <div className={styles.sendComment}>
        <div
          className={styles.input}
          id='input'
          contentEditable='true'
          placeholder='Написать комментарий...'
          role='textbox'
          aria-multiline='true'
        ></div>
        <Button appearance='primary' disabled={true}>
          <SendIcon className={styles.send} />
        </Button>
      </div>
    </div>
  );
};
