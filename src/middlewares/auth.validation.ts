import z from 'zod';

export const loginValidation = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required!',
        }),
        password: z.string({
            required_error: 'Password is required!',
        }),
    }),
});

export const refreshTokenValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh Token is required!',
        }),
    }),
});

export const changePasswordValidation = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'Old password is required!',
        }),
        newPassword: z.string({
            required_error: 'New password is required!',
        }),
    }),
});
