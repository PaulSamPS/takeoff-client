import React from 'react';
import styles from './ProfilePosts.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useParams } from 'react-router-dom';
import { getPosts } from '../../../redux/actions/postAction';
import { CreatePost } from '../../../components/CreatePost/CreatePost';
import { Post } from '../../../components/Post/Post';

export const ProfilePost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { posts } = useAppSelector((state) => state.postsReducer);

  React.useEffect(() => {
    dispatch(getPosts(id!));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
        {loginUser.id === id && <CreatePost />}
        {posts.length > 0 && (
          <div className={styles.posts}>
            {posts
              .filter((f) => f.user._id === id)
              .map((post) => (
                <Post key={post._id} post={post} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
