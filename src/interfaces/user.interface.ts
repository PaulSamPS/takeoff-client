export interface IUser {
  id: string;
  name: string;
  email: string;
  position: string;
  level: string;
  role: string;
  avatar: string;
  lastVisit: Date;
}

export interface IResponseUser {
  accessToken: string;
  user: IUser;
}

export interface IUserAll {
  _id: string;
  name: string;
  email: string;
  position: string;
  level: string;
  role: string;
  avatar: string;
  lastVisit: Date;
  isOnline: boolean;
}
