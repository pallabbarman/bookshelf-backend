"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = void 0;
const http_status_1 = __importDefault(require("http-status"));
const book_service_1 = require("../services/book.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
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
