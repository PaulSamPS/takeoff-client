import React from 'react';
import styles from './PostLike.module.scss';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http/axios';
import cn from 'classnames';
import { ReactComponent as LikesIcon } from '../../helpers/icons/like.svg';
import { useAppSelector } from '../../hooks/redux';
import { PostLikeProps } from './PostLike.props';
import { usePost } from '../../hooks/usePost';

export const PostLike = ({ post }: PostLikeProps): JSX.Element => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { likes, handleLike } = usePost(post);

  return (
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
                  like.user.avatar === null ? `/photo.png` : `${API_URL}/avatar/${like.user.avatar}`
                }
                alt={like.user.name.firstName + ' ' + like.user.name.lastName}
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
  );
};
