import {
    createBook,
    deleteBook,
    getAllBooks,
    getSingleBooks,
    updateBook,
} from 'controllers/book.controller';
import { Router } from 'express';
import auth from 'middlewares/auth';
import { bookValidation, updateBookValidation } from 'middlewares/book.validation';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';

const router = Router();

router.post('/add-new-book', validateRequest(bookValidation), auth(USER_ROLE.user), createBook);
router.get('/', getAllBooks);
router.get('/:id', getSingleBooks);
router.patch('/:id', validateRequest(updateBookValidation), auth(USER_ROLE.user), updateBook);
router.delete('/:id', auth(USER_ROLE.user), deleteBook);

export default router;
