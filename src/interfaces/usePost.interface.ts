export interface IUserPost {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
}

export interface ILikes {
    _id: string;
    user: IUserPost;
}

export interface ICommentsPost {
    _id: string;
    user: IUserPost;
    text: string;
    date: Date | number;
}

export interface IPostReturn {
    comments: ICommentsPost[],
    likes: ILikes[],
    text: string,
    setText: (text: string) => void,
    handleLike: () => void,
    handleComment: () => void,
    handleDeletePost: () => void
}
