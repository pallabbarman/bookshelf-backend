/* eslint-disable import/prefer-default-export */
import z from 'zod';

export const userValidation = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({
                required_error: 'First name is required',
            }),
            lastName: z.string({
                required_error: 'Last name is required',
            }),
        }),
        email: z
            .string({
                required_error: 'Phone number is required!',
            })
            .email(),
        password: z.string({
            required_error: 'Password is required!',
        }),
        address: z.string().optional(),
    }),
});
