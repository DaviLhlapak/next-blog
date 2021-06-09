import { IComment } from './Comment'
import { IPost } from './Post';

export interface IUser{
    id: number;
    name: string;
    image?: string;
    comments: IComment[];
    posts: IPost[];
}