/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { addNewBook } from 'services/book.service';
import { IBook } from 'types/book';
import catchAsync from 'utils/catchAsync';
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
