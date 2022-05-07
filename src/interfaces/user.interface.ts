export interface IUser {
  id: number;
  name: string;
  email: string;
  position: string;
  level: string;
  avatar: string;
}

export interface IResponseUser {
  accessToken: string;
  user: IUser;
}
