
export interface IOnlineUsers {
    userId: string | undefined;
    socketId: string;
}

export interface INewMessageToast {
    avatar: string | null
    date: Date | number
    message: string
    name: string
    receiver: string
    sender: string
}
