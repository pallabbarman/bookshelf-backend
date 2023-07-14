"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidation = exports.reviewZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.reviewZodSchema = zod_1.default.object({
    reviewer: zod_1.default.string(),
    rating: zod_1.default.number().min(1).max(5),
    comment: zod_1.default.string(),
});
exports.bookValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: 'Title is required',
        }),
        author: zod_1.default.string({
            required_error: 'Author is required!',
        }),
        genre: zod_1.default.string({
            required_error: 'Genre is required!',
        }),
        publicationDate: zod_1.default.string({
            required_error: 'Publication date is required!',
        }),
        user: zod_1.default.string({
            required_error: 'User is required!',
        }),
        reviews: zod_1.default.array(exports.reviewZodSchema).default([]).optional(),
    }),
});
