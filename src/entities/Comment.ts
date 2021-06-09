import { IPost } from "./Post";
import { IUser } from "./User";

export interface IComment{
    id: number;
    content: string;
    createdAt: Date;
    user: IUser;
    userId: number;
    post: IPost;
    postId: number;
}