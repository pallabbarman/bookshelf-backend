/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import { bookSearchableFields } from 'constants/book';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import Book from 'models/book.model';
import User from 'models/user.model';
import { SortOrder } from 'mongoose';
import { IBook, IBookFilters } from 'types/book';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';

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

export const allBooks = async (
    filters: IBookFilters,
    paginationOption: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
    const { search, ...filtersData } = filters;

    const andConditions = [];

    if (search) {
        andConditions.push({
            $or: bookSearchableFields.map((field) => ({
                [field]: {
                    $regex: search,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOption);

    const sortCondition: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Book.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .populate('user')
        .populate('reviews.reviewer');

    const total = await Book.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const singleBook = async (id: string): Promise<IBook | null> => {
    const result = await Book.findById(id).populate('user').populate('reviews.reviewer');

    return result;
};

export const editBook = async (
    id: string,
    payload: Partial<IBook>,
    user: JwtPayload
): Promise<IBook | null> => {
    const { id: userId } = user;
    const book = await Book.findOne({ _id: id, user: userId });

    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not Found!');
    }

    const result = await Book.findOneAndUpdate({ _id: id }, payload, { new: true })
        .populate('user')
        .populate('reviews.reviewer');

    return result;
};

export const removeBook = async (id: string, user: JwtPayload): Promise<IBook | null> => {
    const { id: userId } = user;
    const book = await Book.findOne({ _id: id, user: userId });

    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not Found!');
    }

    const result = await Book.findByIdAndDelete(id);

    return result;
};
