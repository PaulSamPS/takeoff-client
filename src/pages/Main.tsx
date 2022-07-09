import React from 'react';
import styles from './Main.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getPosts } from '../redux/actions/postAction';
import { Post } from '../components/Post/Post';
import { Spinner } from '../components/Spinner/Spinner';
import { CreatePost } from '../components/CreatePost/CreatePost';
import { RightBar } from '../components/RightBar/RightBar';
import { useLocation } from 'react-router-dom';

export const Main = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const { posts, isLoading } = useAppSelector((state) => state.postsReducer);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const allPosts = queryParams.get('posts');
  const myPosts = queryParams.get('my-posts');

  React.useEffect(() => {
    queryParams.append('posts', 'all');
    dispatch(getPosts(user.id));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CreatePost />
        <div className={styles.posts}>
          {myPosts &&
            posts
              .filter((f) => f.user._id === myPosts)
              .map((post) => <Post key={post._id} post={post} />)}
          {allPosts && posts.map((post) => <Post key={post._id} post={post} />)}
        </div>
      </div>
      <RightBar
        queryFirst={allPosts}
        querySecond={myPosts}
        firstItem={'Все посты'}
        secondItem={'Мои посты'}
        firstItemLink={'?posts=all'}
        secondItemLink={`?my-posts=${user.id}`}
      />
    </div>
  );
};
