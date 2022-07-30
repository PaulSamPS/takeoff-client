import { AppDispatch } from '../store';
import { $apiAuth } from '../../http/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';
import { IPost, postsReducer } from '../reducers/postsReducer';

// interface IUserPost {
//   _id: string;
//   name: string;
//   email: string;
//   position: string;
//   level: string;
//   role: string;
//   avatar: string | null;
// }
//
// interface ICommentsPost {
//   _id: string;
//   user: IUserPost;
//   text: string;
//   date: Date;
// }
//
// interface IPost {
//   _id: string;
//   user: IUserPost;
//   text: string;
//   image: string | null;
//   likes: IUserPost[];
//   comments: ICommentsPost[];
//   createdAt: Date;
//   updatedAt: Date;
// }

export const createPost = (obj: any | FormData) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/post/create`, obj);
};

export const deletePost = (postId: string, userId: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/post/delete/${postId}`, { userId });
};

export const getPosts = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(postsReducer.actions.setLoading());
  await $apiAuth
    .get(`api/post/${id}`)
    .then((res: AxiosResponse<IPost[]>) => {
      dispatch(postsReducer.actions.setSuccess(res.data));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(postsReducer.actions.setError(e.response?.data.message));
    });
};

export const setLikePost = (postId: string, userId: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/post/like/${postId}`, { userId });
};

export const setUnlikePost = (postId: string, userId: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/post/unlike/${postId}`, { userId });
};
