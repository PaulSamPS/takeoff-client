import React from 'react';
import { SocketContext } from '../helpers/socketContext';
import { useAppDispatch, useAppSelector } from './redux';
import { deletePost } from '../redux/actions/postAction';
import {
  ICommentsPost,
  ILikes,
  IPost,
  IPostReturn,
  IUserPost,
} from '../interfaces/usePost.interface';

const initialStateFindPost = {
  _id: '',
  user: {} as IUserPost,
  text: '',
  image: null,
  likes: [],
  comments: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const usePost = (post: IPost): IPostReturn => {
  const socket = React.useContext(SocketContext);
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const dispatch = useAppDispatch();

  const [likes, setLikes] = React.useState<ILikes[]>(post.likes);
  const [comments, setComments] = React.useState<ICommentsPost[]>(post.comments);
  const [text, setText] = React.useState<string>('');
  const [findPost, setFindPost] = React.useState<IPost>(initialStateFindPost);

  const isLiked =
    likes.length > 0 && likes.filter((like) => like.user._id === loginUser.id).length > 0;

  const handleLike = () => {
    socket?.emit('like:post', {
      postId: post._id,
      userId: loginUser.id,
      userToNotifyId: post.user._id,
      like: isLiked ? false : true,
    });
    socket?.once('post:liked', ({ likeId }: { likeId: string }) => {
      if (isLiked) {
        setLikes((prev) => prev.filter((like: ILikes) => like.user._id !== loginUser.id));
      } else {
        const newLike = {
          _id: likeId,
          user: {
            _id: loginUser.id,
            avatar: loginUser.avatar,
            firstName: loginUser.name.firstName,
            lastName: loginUser.name.lastName,
          },
        };
        setLikes((prev) => [...prev, newLike]);
      }
    });
  };

  const handleComment = () => {
    socket?.emit('comment:post', { postId: post._id, userId: loginUser.id, text: text });
    socket?.once('post:commented', ({ commentId }: { commentId: string }) => {
      const newComment: ICommentsPost = {
        _id: commentId,
        user: {
          _id: loginUser.id,
          avatar: loginUser.avatar,
          firstName: loginUser.name.firstName,
          lastName: loginUser.name.lastName,
        },
        text,
        date: Date.now(),
      };
      setComments((prev) => [newComment, ...prev]);
      socket?.emit('post:get', { userId: post.user._id });
      handleFindPost(post._id);
    });
    setText('');
  };

  const handleFindPost = (postId: string) => {
    socket?.emit('post:find', { postId });
    socket?.on('post:findSuccess', ({ post }: { post: IPost }) => {
      setFindPost(post);
    });
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id, post.user._id)).then(() => {
      socket?.emit('post:get', { userId: loginUser.id });
    });
  };

  return {
    comments,
    likes,
    text,
    findPost,
    setText,
    handleLike,
    handleComment,
    handleDeletePost,
    handleFindPost,
  };
};
