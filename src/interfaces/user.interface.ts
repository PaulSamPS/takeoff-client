export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  lastVisit: Date;
  notification: boolean;
  bio: {
    birthday: {
      day: string;
      month: string;
      year: string;
    };
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
