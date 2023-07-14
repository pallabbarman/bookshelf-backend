/* eslint-disable comma-dangle */
import envConfig from 'configs/env.config';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import User from 'models/user.model';
import { ILoginUserResponse, IRefreshTokenResponse } from 'types/auth';
import { IUser, IUserLogin } from 'types/user';
import { createToken, verifyToken } from 'utils/jwtGenerator';

export const newUser = async (payload: IUser): Promise<IUser | null> => {
    const result = await User.create(payload);

    return result;
};

export const signInUser = async (payload: IUserLogin): Promise<ILoginUserResponse> => {
    const { email: userEmail, password } = payload;

    const user = new User();

    let isPasswordMatched;

    const isUserExist = await user.isUserExist(userEmail);

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
    }

    if (isUserExist.password) {
        isPasswordMatched = await user.isPasswordMatched(password, isUserExist?.password);
    }

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
    }

    const { email } = isUserExist;

    // create access token
    const accessToken = createToken(
        { email },
        envConfig.jwt.secret as Secret,
        envConfig.jwt.expires_in as string
    );

    // create refresh token
    const refreshToken = createToken(
        { email },
        envConfig.jwt.refresh_token as Secret,
        envConfig.jwt.refresh_expire_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};

export const userRefreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    // verify token
    let verifiedToken = null;
    const user = new User();

    try {
        verifiedToken = verifyToken(token, envConfig.jwt.refresh_token as Secret);
    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token!');
    }

    const { email: userEmail } = verifiedToken;

    const isUserExist = await user.isUserExist(userEmail);

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
    }

    const { email } = isUserExist;

    const newAccessToken = createToken(
        {
            email,
        },
        envConfig.jwt.secret as Secret,
        envConfig.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken,
    };
};
