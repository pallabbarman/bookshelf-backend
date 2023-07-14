/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
import { bookFilterableFields } from 'constants/book';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { addNewBook, allBooks, editBook, removeBook, singleBook } from 'services/book.service';
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

export const getSingleBooks = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await singleBook(id);

    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book retrieved successfully!',
        data: result,
    });
});

export const updateBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const { user } = req;

    const result = await editBook(id, data, user);

    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book updated successfully!',
        data: result,
    });
});

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req;

    const result = await removeBook(id, user);

    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book is deleted successfully!',
        data: result,
    });
});
