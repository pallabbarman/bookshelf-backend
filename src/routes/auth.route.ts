import { createUser, loginUser, refreshTokenForUser } from 'controllers/auth.controller';
import { Router } from 'express';
import { loginValidation, refreshTokenValidation } from 'middlewares/auth.validation';
import { userValidation } from 'middlewares/user.validation';
import validateRequest from 'middlewares/validateRequest';

const router = Router();

router.post('/signup', validateRequest(userValidation), createUser);
router.post('/login', validateRequest(loginValidation), loginUser);
router.post('/refresh-token', validateRequest(refreshTokenValidation), refreshTokenForUser);

export default router;
