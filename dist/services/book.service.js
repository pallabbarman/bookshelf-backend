"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComments = exports.removeBook = exports.editBook = exports.singleBook = exports.allBooks = exports.addNewBook = void 0;
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
const book_1 = require("../constants/book");
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const book_model_1 = __importDefault(require("../models/book.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const pagination_1 = __importDefault(require("../utils/pagination"));
const addNewBook = async (payload, user) => {
    const { id } = user;
    if (payload.user !== id) {
        throw new apiError_1.default(http_status_1.default.CONFLICT, 'User not matched!');
    }
    const matchUser = await user_model_1.default.findById(payload.user);
    if (!matchUser) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const result = (await (await book_model_1.default.create(payload)).populate('user')).populate('reviews.reviewer');
    return result;
};
exports.addNewBook = addNewBook;
const allBooks = async (filters, paginationOption) => {
    const { search, ...filtersData } = filters;
    const andConditions = [];
    if (search) {
        andConditions.push({
            $or: book_1.bookSearchableFields.map((field) => ({
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
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOption);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await book_model_1.default.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .populate('user')
        .populate('reviews.reviewer');
    const total = await book_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.allBooks = allBooks;
const singleBook = async (id) => {
    const result = await book_model_1.default.findById(id).populate('user').populate('reviews.reviewer');
    return result;
};
exports.singleBook = singleBook;
const editBook = async (id, payload, user) => {
    const { id: userId } = user;
    const book = await book_model_1.default.findOne({ _id: id, user: userId });
    if (!book) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book not Found!');
    }
    const result = await book_model_1.default.findOneAndUpdate({ _id: id }, payload, { new: true })
        .populate('user')
        .populate('reviews.reviewer');
    return result;
};
exports.editBook = editBook;
const removeBook = async (id, user) => {
    const { id: userId } = user;
    const book = await book_model_1.default.findOne({ _id: id, user: userId });
    if (!book) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book not Found!');
    }
    const result = await book_model_1.default.findByIdAndDelete(id);
    return result;
};
exports.removeBook = removeBook;
const addComments = async (id, data) => {
    const { comment, reviewer } = data;
    const book = await book_model_1.default.findOne({ _id: id });
    if (!book) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book not Found!');
    }
    book.reviews?.push({ reviewer, comment, date: new Date() });
    await book.save();
    return {
        reviewer,
        comment,
        date: new Date(),
    };
};
exports.addComments = addComments;
