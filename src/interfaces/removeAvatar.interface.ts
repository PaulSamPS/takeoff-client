export interface IRemoveAvatar {
    avatar: string;
    userId: string;
    setModal: (click: boolean) => void;
    setDeleteUser?: (click: boolean) => void;
    deleteUser?: boolean;
}
