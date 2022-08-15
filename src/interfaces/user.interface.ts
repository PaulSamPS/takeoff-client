export interface IUser {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  role: string;
  avatar: string;
  lastVisit: Date;
  notificationCount: number;
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
  settings: {
    notification: {
      messagesToast: boolean;
    };
  };
}

export interface IResponseUser {
  accessToken: string;
  user: IUser;
}
