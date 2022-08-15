import React from 'react';
import styles from './News.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Post } from '../../components/Post/Post';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { CreatePost } from '../../components/CreatePost/CreatePost';
import { RightBar } from '../../components/RightBar/RightBar';
import { SocketContext } from '../../helpers/socketContext';
import { setSuccess } from '../../redux/reducers/postsReducer';

export const News = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { posts, isLoading } = useAppSelector((state) => state.postsReducer);
  const dispatch = useAppDispatch();

  const allPosts = window.location.pathname === '/main/news';
  const myPosts = window.location.pathname === `/main/news/${loginUser.id}`;

  React.useEffect(() => {
    socket?.emit('post:get', { userId: loginUser.id });
    socket?.on('post:send', ({ posts }) => {
      dispatch(setSuccess(posts));
    });

    return () => {
      socket?.off('post:send');
    };
  }, [socket]);

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
              .filter((f) => f.user._id === loginUser.id)
              .map((post) => <Post key={post._id} post={post} />)}
          {allPosts && posts.map((post) => <Post key={post._id} post={post} />)}
        </div>
      </div>
      <RightBar
        firstItem={'Все посты'}
        secondItem={'Мои посты'}
        firstItemLink={'/main/news'}
        secondItemLink={`/main/news/${loginUser.id}`}
      />
    </div>
  );
};
