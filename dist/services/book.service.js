"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewBook = void 0;
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const book_model_1 = __importDefault(require("../models/book.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
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
