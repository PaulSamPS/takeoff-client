import { AppDispatch } from '../store';
import { $apiAuth } from '../../http/axios';

export const createPost = (obj: any | FormData) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/post/create`, obj);
};

export const deletePost = (postId: string, userId: string) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/post/delete/${postId}`, { userId });
};
