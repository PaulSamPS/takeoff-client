import { $apiAuth } from '../../http/axios';
import { IResponseUser } from '../../interfaces/user.interface';

export const getChatUser = (id: string | null) => async () => {
  try {
    const res = await $apiAuth.get<IResponseUser>(`api/chat/user/${id}`);
    console.log(res.data.user, '121231');
    return res.data.user;
  } catch (e) {
    console.log(e);
  }
};
