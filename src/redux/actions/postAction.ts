import { AppDispatch } from '../store';
import { $apiAuth } from '../../http/axios';

export const createPost = (obj: any | FormData) => async (dispatch: AppDispatch) => {
  await $apiAuth.post(`api/post/create`, obj);
};
