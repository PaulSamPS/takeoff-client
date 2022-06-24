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

export const getConversations = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(conversationReducer.actions.setLoading());
  await $apiAuth
    .get(`api/chat/user-chats/${id}`)
    .then((res: AxiosResponse<IConversation[]>) => {
      dispatch(conversationReducer.actions.setSuccess(res.data));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(conversationReducer.actions.setError(e.response?.data.message));
    });
};

export const setMessagesRead = (userId: string, id: string | undefined | null) => async () => {
  try {
    await $apiAuth.post(`api/chat/messages-read/${userId}`, { id });
  } catch (e) {
    console.log(e);
  }
};

export const setMessagesUnread = (userId: string, id: string | undefined | null) => async () => {
  try {
    await $apiAuth.post(`api/chat/messages-unread/${userId}`, { id });
  } catch (e) {
    console.log(e);
  }
};

export const getUnreadMessages = (id: string) => async () => {
  try {
    await $apiAuth.post(`api/chat/user-chats/${id}`);
  } catch (e) {
    console.log(e);
  }
};
