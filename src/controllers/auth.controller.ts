import envConfig from 'configs/env.config';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { newUser, signInUser, userRefreshToken } from 'services/auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from 'types/auth';
import { IUser } from 'types/user';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const { ...user } = req.body;

    const result = await newUser(user);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'You account has been successfully created!',
        data: result,
    });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await signInUser(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
        secure: envConfig.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Logged in successfully!',
        data: others,
    });
});

export const refreshTokenForUser = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await userRefreshToken(refreshToken);

    // set refresh token into cookie
    const cookieOptions = {
        secure: envConfig.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New access token generated successfully!',
        data: result,
    });
});
