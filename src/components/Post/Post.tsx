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
import { useAppSelector } from '../../hooks/redux';
import { socket } from '../../helpers/socket';

export const Post = ({ post }: PostProps) => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [likes, setLikes] = React.useState<any>(post.likes);
  const [likesLoading, setLikesLoading] = React.useState<boolean>(false);
  const isLiked = likes.length > 0 && likes.filter((like: any) => like.user === user.id).length > 0;

  const handleLike = () => {
    setLikesLoading(true);
    socket.emit('like:post', { postId: post._id, userId: user.id, like: isLiked ? false : true });
    socket.on('post:liked', () => {
      if (isLiked) {
        setLikes((prev: any) => prev.filter((like: any) => like.user !== user.id));
        setLikesLoading(false);
      } else {
        setLikes((prev: any) => [...prev, { user: user.id }]);
        setLikesLoading(false);
      }
    });
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
          {likesLoading ? (
            'Загрузка'
          ) : (
            <>
              <div
                className={cn(styles.icon, {
                  [styles.likeBackgroundImage]:
                    likes.length > 0 && likes.map((p: any) => p.user).includes(user.id),
                })}
              >
                <LikesIcon />
              </div>
              <span className={styles.count}>{likes.length > 0 ? likes.length : 0}</span>
            </>
          )}
        </div>
        <div className={styles.iconBg}>
          <div className={styles.icon}>
            <CommentIcon />
          </div>
          <span className={styles.count}>
            {post.comments.length > 0 ? post.comments.length : 0}
          </span>
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
