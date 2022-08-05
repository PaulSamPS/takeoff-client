import React, { FormEvent } from 'react';
import { PostCommentProps } from './PostComment.props';
import styles from './PostComment.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import { calculateTime } from '../../helpers/calculateTime';
import { Button } from '../UI/Button/Button';
import { ReactComponent as SendIcon } from '../../helpers/icons/send.svg';
import { usePost } from '../../hooks/usePost';

export const PostComment = ({ post }: PostCommentProps) => {
  const { comments, handleComment, setText, text } = usePost(post);
  const [isAllComments, setIsAllComments] = React.useState<boolean>(false);
  const [countComments, setCountComments] = React.useState<number>(0);

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
      {post.comments.length > 0 && (
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
                  alt={comment.user.firstName + ' ' + comment.user.lastName}
                />
              </Link>
              <div className={styles.body}>
                <Link to={`/main/profile/${comment.user._id}`} className={styles.user}>
                  {comment.user.firstName + ' ' + comment.user.lastName}
                </Link>
                <span className={styles.comment}>{comment.text}</span>
                <span className={styles.dateComment}>{calculateTime(comment.date)}</span>
              </div>
            </div>
          ))}
          {post.comments.length > 0 && (
            <div className={styles.showAllComments}>
              {comments.length > 3 && !isAllComments ? (
                <span onClick={handleViewComments}>Показать все комментарии</span>
              ) : (
                <span onClick={handleMoreComments}>Скрыть комментарии</span>
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
    </>
  );
};
