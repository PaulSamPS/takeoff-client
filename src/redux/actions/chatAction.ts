import { $apiAuth } from '../../http/axios';
import { IResponseUser } from '../../interfaces/user.interface';
import { AppDispatch } from '../store';
import { conversationReducer, IConversation } from '../reducers/conversationReducer';
import { AxiosError, AxiosResponse } from 'axios';
import { IErrorResponse } from '../../interfaces/axiosResponse.interface';

export const getChatUser = (id: string | null) => async () => {
  try {
    const res = await $apiAuth.get<IResponseUser>(`api/chat/user/${id}`);
    return res.data.user;
  } catch (e) {
    console.log(e);
  }
};

export const getConversations = (id: string | null) => async (dispatch: AppDispatch) => {
  dispatch(conversationReducer.actions.setLoading());
  await $apiAuth
    .get(`api/chat/${id}`)
    .then((res: AxiosResponse<IConversation[]>) => {
      dispatch(conversationReducer.actions.setSuccess(res.data));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(conversationReducer.actions.setError(e.response?.data.message));
    });
};
