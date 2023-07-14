"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_controller_1 = require("../controllers/book.controller");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const book_validation_1 = require("../middlewares/book.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_1 = require("../types/user");
const router = (0, express_1.Router)();
router.post('/add-new-book', (0, validateRequest_1.default)(book_validation_1.bookValidation), (0, auth_1.default)(user_1.USER_ROLE.user), book_controller_1.createBook);
router.get('/', book_controller_1.getAllBooks);
exports.default = router;
