import {IUser} from './user.interface';

export interface IFollow {
    followingsUser: IUser[];
    followersUser: IUser[];
}

export interface IFollowReturn {
    followings: IUser[];
    followers: IUser[];
    handleFollow: () => void;
    handleUnfollow: () => void;
}
