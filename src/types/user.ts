/* eslint-disable no-shadow */
import { Model } from 'mongoose';

export interface UserName {
    firstName: string;
    lastName: string;
}

export interface IUser {
    id: string;
    name: UserName;
    email: string;
    password: string;
    role: 'user';
    address?: string;
    wishlist?: string[];
    currentlyReading?: {
        book: string;
        startDate?: Date;
        finished?: boolean;
    }[];
    finishedReading?: {
        book: string;
        startDate?: Date;
        endDate?: Date;
    }[];
}
export interface IUserMethods {
    isUserExist(email: string): Promise<Partial<IUser | null>>;
    isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export enum USER_ROLE {
    user = 'user',
}
