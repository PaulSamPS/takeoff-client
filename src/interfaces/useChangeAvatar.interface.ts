import {ChangeEvent, SyntheticEvent} from 'react';
import {IAppendAvatarInterface} from './appendAvatar.interface';

export interface IUseChangeAvatarProps {
    setModal: (click: boolean) => void;
    userId: string;
}

export interface IUseChangeAvatar {
    onSubmit: (e: SyntheticEvent) => void;
    previewAvatar: IAppendAvatarInterface[];
    selectFileAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
    filesAvatar: FileList | null;
}
