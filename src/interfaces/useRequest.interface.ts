import {IUser} from './user.interface';

export interface IRequest {
    followingsUser: IUser[];
}

export interface IFriends {
    friendsUser: IUser[];
}

export interface IReturnRequest {
    request: IUser[];
    friends: IUser[];
    loadingFriends: boolean;
    friendsUserInfo: IUser[];
    addFriend: (id: string | undefined) => void;
    rejectFriend: (id: string | undefined) => void;
}
