/* eslint-disable no-shadow */
import { Model } from 'mongoose';

export interface UserName {
    firstName: string;
    lastName: string;
}

export interface IUser {
    name: UserName;
    email: string;
    password: string;
    address?: string;
}
export interface IUserMethods {
    isUserExist(email: string): Promise<Partial<IUser | null>>;
    isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export interface IUserLogin {
    email: string;
    password: string;
}
