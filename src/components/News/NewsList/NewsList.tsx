import React from 'react';
import styles from '../../../pages/News/News.module.scss';
import { NewsItem } from './NewsItem/NewsItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSuccess } from '../../../redux/reducers/postsReducer';
import { Spinner } from '../../UI/Spinner/Spinner';
import { SocketContext } from '../../../helpers/socketContext';

export const NewsList = () => {
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
    <div className={styles.posts} style={{ maxWidth: '100%' }}>
      {myPosts &&
        posts
          .filter((f) => f.user._id === loginUser.id)
          .map((post) => <NewsItem key={post._id} post={post} />)}
      {allPosts && posts.map((post) => <NewsItem key={post._id} post={post} />)}
    </div>
  );
};
