/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
import { Schema, model } from 'mongoose';
import { BookModel, IBook } from 'types/book';

const bookSchema = new Schema<IBook>(
    {
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
        publicationDate: {
            type: Date,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reviews: {
            type: [
                {
                    reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
                    rating: {
                        type: Number,
                        min: 1,
                        max: 5,
                    },
                    comment: String,
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform(_doc, ret) {
                delete ret.password; // Exclude the password field from the JSON object
            },
        },
    }
);

const Book = model<IBook, BookModel>('Book', bookSchema);

export default Book;