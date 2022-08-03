import React from 'react';
import { PostProps } from './Post.props';
import styles from './Post.module.scss';
import { ReactComponent as CommentIcon } from '../../helpers/icons/comment.svg';
import { PostLike } from '../PostLike/PostLike';
import { PostComment } from '../PostComment/PostComment';
import { usePost } from '../../hooks/usePost';
import { PostBody } from '../PostBody/PostBody';
import { ReactComponent as MoreIcon } from '../../helpers/icons/more.svg';
import { useAppSelector } from '../../hooks/redux';

export const Post = ({ post }: PostProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { handleDeletePost, comments } = usePost(post);

  return (
    <div className={styles.wrapper}>
      {post.user._id === loginUser.id && (
        <div className={styles.more}>
          <MoreIcon />
          <div className={styles.moreOptions}>
            <div onClick={handleDeletePost}>Удалить</div>
          </div>
        </div>
      )}
      <PostBody post={post} />
      <div
        className={styles.icons}
        style={{ paddingBottom: `${post.comments.length > 0 && '20px'}` }}
      >
        <PostLike post={post} />
        <div className={styles.iconBg}>
          <div className={styles.icon}>
            <CommentIcon />
          </div>
          <span className={styles.count}>{comments.length > 0 ? comments.length : 0}</span>
        </div>
        {post.comments.length > 0 && <div className={styles.border} />}
      </div>
      <PostComment post={post} />
    </div>
  );
};
