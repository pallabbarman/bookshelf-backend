"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const bcrypt_1 = require("bcrypt");
const env_config_1 = __importDefault(require("../configs/env.config"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
        _id: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ['user'],
        default: 'user',
    },
    address: {
        type: String,
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
userSchema.methods.isUserExist = async function (email) {
    const user = await User.findOne({ email }, {
        id: 1,
        role: 1,
        email: 1,
        password: 1,
    });
    return user;
};
userSchema.methods.isPasswordMatched = async function (givenPassword, savedPassword) {
    const isMatched = await (0, bcrypt_1.compare)(givenPassword, savedPassword);
    return isMatched;
};
userSchema.pre('save', async function (next) {
    this.password = await (0, bcrypt_1.hash)(this.password, Number(env_config_1.default.bcrypt_salt_round));
    next();
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
