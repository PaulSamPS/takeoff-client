export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  lastVisit: Date;
  notification: boolean;
  bio: {
    birthday: string;
    city: string;
    language: string;
    gender: string;
    familyStatus: string;
  };
}

export interface IResponseUser {
  accessToken: string;
  user: IUser;
}
