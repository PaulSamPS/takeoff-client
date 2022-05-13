export interface IUser {
  id: number;
  name: string;
  email: string;
  position: string;
  level: string;
  role: string;
  avatar: string;
}

export interface IResponseUser {
  accessToken: string;
  user: IUser;
}
