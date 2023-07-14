"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = require("express");
const auth_validation_1 = require("../middlewares/auth.validation");
const user_validation_1 = require("../middlewares/user.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.userValidation), auth_controller_1.createUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.loginValidation), auth_controller_1.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.refreshTokenValidation), auth_controller_1.refreshTokenForUser);
exports.default = router;
