import React from 'react';
import styles from './ProfilePosts.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useParams } from 'react-router-dom';
import { CreateNews } from '../../../components/News/CreateNews/CreateNews';
import { NewsItem } from '../../../components/News/NewsList/NewsItem/NewsItem';
import { setSuccess } from '../../../redux/reducers/postsReducer';
import { SocketContext } from '../../../helpers/socketContext';
import { IPost } from '../../../interfaces/usePost.interface';

export const ProfilePost = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { posts } = useAppSelector((state) => state.postsReducer);

  const { id } = useParams();

  React.useEffect(() => {
    socket?.emit('post:get', { userId: id });
    socket?.on('post:send', ({ posts }: { posts: IPost[] }) => {
      dispatch(setSuccess(posts));
    });

    return () => {
      socket?.off('post:send');
    };
  }, [socket, id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
        {loginUser.id === id && <CreateNews />}
        {posts.length > 0 && (
          <div className={styles.posts}>
            {posts
              .filter((f) => f.user._id === id)
              .map((post) => (
                <NewsItem key={post._id} post={post} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
