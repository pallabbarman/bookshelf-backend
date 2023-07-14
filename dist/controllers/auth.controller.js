"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenForUser = exports.loginUser = exports.createUser = void 0;
const env_config_1 = __importDefault(require("../configs/env.config"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("../services/auth.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.createUser = (0, catchAsync_1.default)(async (req, res) => {
    const { ...user } = req.body;
    const result = await (0, auth_service_1.newUser)(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'You account has been successfully created!',
        data: result,
    });
});
exports.loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const { ...loginData } = req.body;
    const result = await (0, auth_service_1.signInUser)(loginData);
    const { refreshToken, ...others } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: env_config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Logged in successfully!',
        data: others,
    });
});
exports.refreshTokenForUser = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await (0, auth_service_1.userRefreshToken)(refreshToken);
    // set refresh token into cookie
    const cookieOptions = {
        secure: env_config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'New access token generated successfully!',
        data: result,
    });
});
