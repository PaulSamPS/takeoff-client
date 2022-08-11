import {IUser, IUserNotifications} from './user.interface';
import {IPost} from './usePost.interface';

export interface INotification {
    _id: string;
    type: 'newLike' | 'newComment' | 'newFollower';
    user: IUserNotifications;
    post: IPost;
    commentId: string;
    text: string;
    date: Date;
}

export interface INotifications {
    _id: string;
    user: IUser;
    notifications: INotification[];
}


export interface INotificationsReturn {
    notifications: INotifications, notificationsCount: number, handleReadNotifications: () => void, isLoading: boolean
}
