"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBooks = exports.getAllBooks = exports.createBook = void 0;
/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
const book_1 = require("../constants/book");
const pagination_1 = __importDefault(require("../constants/pagination"));
const http_status_1 = __importDefault(require("http-status"));
const book_service_1 = require("../services/book.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const pick_1 = __importDefault(require("../utils/pick"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.createBook = (0, catchAsync_1.default)(async (req, res) => {
    const { user } = req;
    const { ...book } = req.body;
    const result = await (0, book_service_1.addNewBook)(book, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'New Book added successfully!',
        data: result,
    });
});
exports.getAllBooks = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, book_1.bookFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, book_service_1.allBooks)(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.getSingleBooks = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await (0, book_service_1.singleBook)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully!',
        data: result,
    });
});
exports.updateBook = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { user } = req;
    const result = await (0, book_service_1.editBook)(id, data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully!',
        data: result,
    });
});
exports.deleteBook = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const result = await (0, book_service_1.removeBook)(id, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book is deleted successfully!',
        data: result,
    });
});
