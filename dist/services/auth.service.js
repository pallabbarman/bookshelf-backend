"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRefreshToken = exports.signInUser = exports.newUser = void 0;
/* eslint-disable comma-dangle */
const env_config_1 = __importDefault(require("../configs/env.config"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtGenerator_1 = require("../utils/jwtGenerator");
const newUser = async (payload) => {
    const result = await user_model_1.default.create(payload);
    return result;
};
exports.newUser = newUser;
const signInUser = async (payload) => {
    const { email: userEmail, password } = payload;
    const user = new user_model_1.default();
    let isPasswordMatched;
    const isUserExist = await user.isUserExist(userEmail);
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    if (isUserExist.password) {
        isPasswordMatched = await user.isPasswordMatched(password, isUserExist?.password);
    }
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect!');
    }
    const { id, email, role } = isUserExist;
    // create access token
    const accessToken = (0, jwtGenerator_1.createToken)({ id, email, role }, env_config_1.default.jwt.secret, env_config_1.default.jwt.expires_in);
    // create refresh token
    const refreshToken = (0, jwtGenerator_1.createToken)({ id, email, role }, env_config_1.default.jwt.refresh_token, env_config_1.default.jwt.refresh_expire_in);
    return {
        accessToken,
        refreshToken,
    };
};
exports.signInUser = signInUser;
const userRefreshToken = async (token) => {
    // verify token
    let verifiedToken = null;
    const user = new user_model_1.default();
    try {
        verifiedToken = (0, jwtGenerator_1.verifyToken)(token, env_config_1.default.jwt.refresh_token);
    }
    catch (err) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token!');
    }
    const { email: userEmail } = verifiedToken;
    const isUserExist = await user.isUserExist(userEmail);
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    const { id, email, role } = isUserExist;
    const newAccessToken = (0, jwtGenerator_1.createToken)({
        id,
        email,
        role,
    }, env_config_1.default.jwt.secret, env_config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
};
exports.userRefreshToken = userRefreshToken;
