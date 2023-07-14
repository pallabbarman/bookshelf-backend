/* eslint-disable import/prefer-default-export */
import { bookFilterableFields } from 'constants/book';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { addNewBook, allBooks } from 'services/book.service';
import { IBook } from 'types/book';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';

export const createBook = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const { ...book } = req.body;

    const result = await addNewBook(book, user);

    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New Book added successfully!',
        data: result,
    });
});

export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await allBooks(filters, paginationOptions);

    sendResponse<IBook[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Books retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
