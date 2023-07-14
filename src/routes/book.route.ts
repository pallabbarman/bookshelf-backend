import { createBook } from 'controllers/book.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import { bookValidation } from 'middlewares/book.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.post('/add-new-book', validateRequest(bookValidation), auth(USER_ROLE.user), createBook);

export default router;
