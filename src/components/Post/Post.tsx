import React, { FormEvent } from 'react';
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

interface IUserPost {
  _id: string;
  name: string;
  avatar: string | null;
}

interface ILikes {
  _id: string;
  user: IUserPost;
}

interface ICommentsPost {
  _id: string;
  user: IUserPost;
  text: string;
  date: Date;
}

export const Post = ({ post }: PostProps) => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const [likes, setLikes] = React.useState<ILikes[]>(post.likes);
  const [comments, setComments] = React.useState<ICommentsPost[]>(post.comments);
  const [text, setText] = React.useState<string | null>('');
  const [likesLoading, setLikesLoading] = React.useState<boolean>(false);
  const isLiked = likes.length > 0 && likes.filter((like) => like.user._id === user.id).length > 0;

  const handleLike = () => {
    setLikesLoading(true);
    socket.emit('like:post', { postId: post._id, userId: user.id, like: isLiked ? false : true });
    socket.once('post:liked', ({ likeId }) => {
      if (isLiked) {
        setLikes((prev: any) => prev.filter((like: ILikes) => like.user._id !== user.id));
        setLikesLoading(false);
      } else {
        const newLike = {
          _id: likeId,
          user: {
            _id: user.id,
            avatar: user.avatar,
            name: user.name,
          },
        };
        setLikes((prev: any) => [...prev, newLike]);
        setLikesLoading(false);
      }
    });
  };

  const handleComment = () => {
    socket.emit('comment:post', { postId: post._id, userId: user.id, text: text });
    socket.once('post:commented', ({ commentId }) => {
      const newComment = {
        _id: commentId,
        user,
        text,
        date: Date.now(),
      };
      setComments((prev: any) => [newComment, ...prev]);
      document.getElementById('input')!.innerHTML = '';
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
      <div
        className={styles.icons}
        style={{ paddingBottom: `${post.comments.length > 0 && '20px'}` }}
      >
        <div className={styles.like}>
          {likes.length > 0 && (
            <div className={styles.peopleLikedPopup}>
              <span>Нравится</span>
              {likes.slice(-3).map((like) => (
                <div className={styles.likedPopup} key={like._id}>
                  <img
                    src={
                      like.user.avatar === null
                        ? `/photo.png`
                        : `${API_URL}/avatar/${like.user.avatar}`
                    }
                    alt={like.user.name}
                  />
                </div>
              ))}
              {likes.length > 3 && <div className={styles.likeMore}>{`+${likes.length - 3}`}</div>}
            </div>
          )}
          <div className={cn(styles.iconBg)} onClick={handleLike}>
            {likesLoading ? (
              'Загрузка'
            ) : (
              <>
                <div
                  className={cn(styles.icon, {
                    [styles.likeBackgroundImage]:
                      likes.length > 0 && likes.map((p) => p.user._id).includes(user.id),
                  })}
                >
                  <LikesIcon />
                </div>
                <span className={styles.count}>{likes.length > 0 ? likes.length : 0}</span>
              </>
            )}
          </div>
        </div>
        <div className={styles.iconBg}>
          <div className={styles.icon}>
            <CommentIcon />
          </div>
          <span className={styles.count}>{comments.length > 0 ? comments.length : 0}</span>
        </div>
        {post.comments.length > 0 && <div className={styles.border} />}
      </div>
      {post.comments.length > 0 && (
        <div className={styles.lastComments}>
          {comments.slice(0, 3).map((comment) => (
            <div key={comment._id} className={styles.grid}>
              <img
                src={
                  comment.user.avatar === null
                    ? `/photo.png`
                    : `${API_URL}/avatar/${comment.user.avatar}`
                }
                alt={comment.user.name}
              />
              <div className={styles.body}>
                <span className={styles.user}>{comment.user.name}</span>
                <span className={styles.comment}>{comment.text}</span>
                <span className={styles.dateComment}>{calculateTime(comment.date)}</span>
              </div>
            </div>
          ))}
          {post.comments.length > 0 && (
            <div className={styles.showAllComments}>
              <span>Показать все комментарии</span>
            </div>
          )}
        </div>
      )}
      <div className={styles.sendComment}>
        <div
          className={styles.input}
          id='input'
          contentEditable='true'
          placeholder='Написать комментарий...'
          role='textbox'
          aria-multiline='true'
          onInput={(e: FormEvent<HTMLDivElement>) => setText(e.currentTarget.textContent)}
        ></div>
        <Button appearance='primary' disabled={!(text && text.length > 0)} onClick={handleComment}>
          <SendIcon className={styles.send} />
        </Button>
      </div>
    </div>
  );
};
