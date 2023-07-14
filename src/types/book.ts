import { Model, Types } from 'mongoose';
import { IUser } from './user';

export interface IReview {
    reviewer: Types.ObjectId | IUser;
    rating: number;
    comment: string;
}

export interface IBook {
    title: string;
    author: string;
    genre: string;
    image: string;
    publicationDate: Date;
    user: Types.ObjectId | IUser;
    reviews?: IReview[];
}

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
    search?: string;
    genre?: string;
    publicationDate?: Date;
};
