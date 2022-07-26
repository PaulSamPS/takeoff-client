import { IPost } from '../redux/reducers/postsReducer';

interface INotifications {
  type: {
    type: string;
    enum: 'newLike' | 'newComment' | 'newFollower';
  };
  user: IUser;
  post: IPost;
  commentId: string;
  text: string;
  date: Date;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  lastVisit: Date;
  notifications: INotifications[];
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
