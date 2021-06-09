import { IComment } from './Comment'
import { IUser } from './User';

export interface IPost{
    id: number;
    title: string;
    subtitle?: string;
    content: string;
    thumb?: string;
    createdAt: Date;
    comments: IComment[];
    author: IUser;
}