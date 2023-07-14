import { Router } from 'express';
import authRoutes from './auth.route';
import bookRoutes from './book.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/books',
        route: bookRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
