/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import Book from 'models/book.model';
import User from 'models/user.model';
import { IBook } from 'types/book';

export const addNewBook = async (payload: IBook, user: JwtPayload): Promise<IBook | null> => {
    const { id } = user;

    if (payload.user !== id) {
        throw new ApiError(httpStatus.CONFLICT, 'User not matched!');
    }

    const matchUser = await User.findById(payload.user);

    if (!matchUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }

    const result = (await (await Book.create(payload)).populate('user')).populate(
        'reviews.reviewer'
    );

    return result;
};
