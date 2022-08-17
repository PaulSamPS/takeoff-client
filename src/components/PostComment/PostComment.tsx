import React, { ChangeEvent } from 'react';
import { PostCommentProps } from './PostComment.props';
import styles from './PostComment.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Button } from '../UI/Button/Button';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import { usePost } from '../../hooks/usePost';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';
import { EmojiPicker } from '../UI/EmojiPicker/EmojiPicker';
import cn from 'classnames';

export const PostComment = ({
  post,
  isAllComments,
  setIsAllComments,
}: PostCommentProps): JSX.Element => {
  const [countComments, setCountComments] = React.useState<number>(10);
  const { comments, handleComment, setText, text } = usePost(post);

  const handleViewComments = () => {
    setIsAllComments(true);
    setCountComments((prevState) => prevState + 10);
  };

  const handleMoreComments = () => {
    setCountComments(3);
    setIsAllComments(false);
  };

  const loadMore = () => {
    setCountComments((prevState) => (comments.length > prevState ? prevState + 10 : prevState));
  };

  return (
    <>
      {post.comments.length > 0 && !isAllComments && (
        <div className={styles.lastComments}>
          {comments.slice(0, isAllComments ? countComments : 3).map((comment) => (
            <div key={comment._id} className={styles.grid}>
              <Link to={`/main/profile/${comment.user._id}`}>
                <img
                  src={
                    comment.user.avatar === null
                      ? `/photo.png`
                      : `${API_URL}/avatar/${comment.user.avatar}`
                  }
                  alt={comment.user.name.firstName + ' ' + comment.user.name.lastName}
                />
              </Link>
              <div className={cn(styles.body, { [styles.bodyBorder]: comments.length <= 1 })}>
                <Link to={`/main/profile/${comment.user._id}`} className={styles.user}>
                  {comment.user.name.firstName + ' ' + comment.user.name.lastName}
                </Link>
                <span className={styles.comment}>
                  {reactStringReplace(comment.text, /:(.+?):/g, (match, i) => (
                    <Emoji key={i} emoji={match} set='apple' size={16} native={false} />
                  ))}
                </span>
                <span className={styles.dateComment}>{calculateTime(comment.date)}</span>
              </div>
            </div>
          ))}
          {post.comments.length > 3 && (
            <div className={styles.showAllComments}>
              {comments.length > 3 && !isAllComments ? (
                <span onClick={handleViewComments}>Показать все комментарии</span>
              ) : (
                isAllComments && <span onClick={handleMoreComments}>Скрыть комментарии</span>
              )}
            </div>
          )}
          {comments.length > countComments && isAllComments && (
            <div className={styles.loadMore}>
              <span onClick={loadMore}>Загрузить еще</span>
            </div>
          )}
        </div>
      )}
      <div className={styles.sendComment}>
        <input
          className={styles.input}
          placeholder='Написать комментарий...'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          value={text!}
        ></input>
        <EmojiPicker setText={setText} text={text!} left={-156} />
        <Button appearance='primary' disabled={!(text && text.length > 0)} onClick={handleComment}>
          <SendIcon className={styles.send} />
        </Button>
      </div>
    </>
  );
};
