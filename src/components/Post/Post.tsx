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
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setLikePost } from '../../redux/actions/postAction';

export const Post = ({ post }: PostProps) => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [like, setLike] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  console.log(like);

  const handleLike = () => {
    if (!post.likes.map((p) => p.user).includes(user.id)) {
      dispatch(setLikePost(post._id, user.id)).then(() => {
        setLike(true);
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <img
          src={post.user.avatar === null ? `/photo.png` : `${API_URL}/avatar/${post.user.avatar}`}
          alt={post.user.name}
        />
        <div className={styles.userPost}>
          <span className={styles.userName}>{post.user.name}</span>
          <span className={styles.date}>{calculateTime(post.createdAt)}</span>
        </div>
      </div>
      <span className={styles.text}>{post.text}</span>
      {post.image && <img src={`${API_URL}/post/${post.image}`} alt={post.text} />}
      <div className={styles.icons}>
        <div className={styles.iconBg} onClick={handleLike}>
          <div
            className={cn(styles.icon, {
              [styles.likeBackgroundImage]:
                post.likes.length > 0 && post.likes.map((p) => p.user).includes(user.id),
            })}
          >
            <LikesIcon />
          </div>
          <span className={styles.count}>{post.likes.length > 0 && post.likes.length}</span>
        </div>
        <div className={styles.iconBg}>
          <div className={styles.icon}>
            <CommentIcon />
          </div>
          <span className={styles.count}>{post.comments.length > 0 && post.comments.length}</span>
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
