import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../http/axios';
import { ReactComponent as CommentIcon } from '../../../../../helpers/icons/comment.svg';
import { ReactComponent as LikesIcon } from '../../../../../helpers/icons/like.svg';
import { useAppSelector } from '../../../../../hooks/redux';
import { usePost } from '../../../../../hooks/usePost';
import { NewsItemIconsProps } from './Icons.props';

import cn from 'classnames';

import styles from './Icons.module.scss';

export const NewsItemIcons = ({
  post,
  setIsPostModal,
  setVisibleNotification,
  isAllComments,
  setIsAllComments,
  postModal,
}: NewsItemIconsProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { likes, handleLike } = usePost(post);

  const handleCloseModals = () => {
    if (setIsPostModal) {
      setIsPostModal(false);
    }

    if (setVisibleNotification) {
      setVisibleNotification(false);
    }
  };

  return (
    <div
      className={styles.icons}
      style={{ paddingBottom: `${post.comments.length > 0 && '20px'}` }}
    >
      <div className={styles.like}>
        {likes.length > 0 && (
          <div className={styles.peopleLikedPopup}>
            <span>Нравится</span>
            {likes.slice(-3).map((like) => (
              <Link
                to={`/main/profile/${like.user._id}`}
                key={like._id}
                className={styles.likedPopup}
                onClick={() => localStorage.setItem('followId', post.user._id)}
              >
                <img
                  src={
                    like.user.avatar === null
                      ? `/photo.png`
                      : `${API_URL}/avatar/${like.user.avatar}`
                  }
                  alt={like.user.name.firstName + ' ' + like.user.name.lastName}
                  onClick={handleCloseModals}
                />
                <div className={styles.tooltip}>
                  <span>{like.user.name.firstName + ' ' + like.user.name.lastName}</span>
                </div>
              </Link>
            ))}
            {likes.length > 3 && <div className={styles.likeMore}>{`+${likes.length - 3}`}</div>}
          </div>
        )}
        <div className={cn(styles.likeBgIcon)} onClick={handleLike}>
          <div
            className={cn(styles.icon, {
              [styles.likeBackgroundImage]:
                likes.length > 0 && likes.map((p) => p.user._id).includes(loginUser.id),
            })}
          >
            <LikesIcon />
          </div>
          <span className={styles.count}>{likes.length > 0 ? likes.length : 0}</span>
        </div>
      </div>
      <div
        className={cn(styles.iconBg, { [styles.iconBgHover]: post.comments.length > 3 })}
        style={{ cursor: post.comments.length > 3 ? 'pointer' : 'auto' }}
        onClick={post.comments.length > 3 ? () => setIsAllComments(!isAllComments) : undefined}
      >
        <div className={styles.icon}>
          <CommentIcon />
        </div>
        <span className={styles.count}>{post.comments.length > 0 ? post.comments.length : 0}</span>
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
  );
};
