import z from 'zod';

export const reviewZodSchema = z.object({
    reviewer: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string(),
});

export const bookValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        author: z.string({
            required_error: 'Author is required!',
        }),
        genre: z.string({
            required_error: 'Genre is required!',
        }),
        image: z.string({
            required_error: 'Image is required!',
        }),
        publicationDate: z.string({
            required_error: 'Publication date is required!',
        }),
        user: z.string({
            required_error: 'User is required!',
        }),
        reviews: z.array(reviewZodSchema).default([]).optional(),
    }),
});

export const updateBookValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        author: z.string().optional(),
        genre: z.string().optional(),
        image: z.string().optional(),
        publicationDate: z.string().optional(),
        user: z.string().optional(),
    }),
});
