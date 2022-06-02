import { $api } from '../http/axios';
import { IResponseUser } from '../interfaces/user.interface';

export const getChatUser = async (_id: string | undefined) => {
  try {
    const res = await $api.get<IResponseUser>(`api/chat/user/${_id}`);
    return res.data.user;
  } catch (e) {
    console.log(e);
  }
};
