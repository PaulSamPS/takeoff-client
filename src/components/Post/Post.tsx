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
import cn from 'classnames';

export const Post = ({ post, postModal }: PostProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [isAllComments, setIsAllComments] = React.useState<boolean>(false);

  const { handleDeletePost } = usePost(post);

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
        <div
          className={cn(styles.iconBg, { [styles.iconBgHover]: post.comments.length > 3 })}
          style={{ cursor: post.comments.length > 3 ? 'pointer' : 'auto' }}
          onClick={post.comments.length > 3 ? () => setIsAllComments(!isAllComments) : undefined}
        >
          <div className={styles.icon}>
            <CommentIcon />
          </div>
          <span className={styles.count}>
            {post.comments.length > 0 ? post.comments.length : 0}
          </span>
        </div>
        {post.comments.length > 0 && (
          <div
            className={styles.border}
            style={{
              borderBottom: postModal && !isAllComments ? 'none' : '1px solid var(--border)',
            }}
          />
        )}
      </div>
      <PostComment post={post} isAllComments={isAllComments} setIsAllComments={setIsAllComments} />
    </div>
  );
};
