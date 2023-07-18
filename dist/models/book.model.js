"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://i.ibb.co/4MwRXwT/book.jpg',
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviews: {
        type: [
            {
                reviewer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
                comment: String,
                date: Date,
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform(_doc, ret) {
            delete ret.password; // Exclude the password field from the JSON object
        },
    },
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
