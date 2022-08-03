import React from 'react';
import { SocketContext } from '../helpers/context';
import { useAppDispatch, useAppSelector } from './redux';
import { deletePost } from '../redux/actions/postAction';
import { IPost } from '../redux/reducers/postsReducer';

interface IUserPost {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

interface ILikes {
  _id: string;
  user: IUserPost;
}

interface ICommentsPost {
  _id: string;
  user: IUserPost;
  text: string;
  date: Date;
}

export const usePost = (post: IPost) => {
  const socket = React.useContext(SocketContext);
  const [likes, setLikes] = React.useState<ILikes[]>(post.likes);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const [comments, setComments] = React.useState<ICommentsPost[]>(post.comments);
  const [text, setText] = React.useState<string | null>('');
  const dispatch = useAppDispatch();
  const isLiked =
    likes.length > 0 && likes.filter((like) => like.user._id === loginUser.id).length > 0;

  const handleLike = () => {
    socket?.emit('like:post', {
      postId: post._id,
      userId: loginUser.id,
      userToNotifyId: post.user._id,
      like: isLiked ? false : true,
    });
    socket?.once('post:liked', ({ likeId }) => {
      if (isLiked) {
        setLikes((prev: any) => prev.filter((like: ILikes) => like.user._id !== loginUser.id));
      } else {
        const newLike = {
          _id: likeId,
          user: {
            _id: loginUser.id,
            avatar: loginUser.avatar,
            firsName: loginUser.firstName,
            lastName: loginUser.lastName,
          },
        };
        setLikes((prev: any) => [...prev, newLike]);
      }
    });
  };

  const handleComment = () => {
    socket?.emit('comment:post', { postId: post._id, userId: loginUser.id, text: text });
    socket?.once('post:commented', ({ commentId }) => {
      const newComment = {
        _id: commentId,
        user: loginUser,
        text,
        date: Date.now(),
      };
      setComments((prev: any) => [newComment, ...prev]);
      document.getElementById('input')!.innerHTML = '';
    });
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id, post.user._id)).then(() => {
      socket?.emit('post:get', { userId: loginUser.id });
    });
  };

  return { comments, likes, text, setText, handleLike, handleComment, handleDeletePost };
};
