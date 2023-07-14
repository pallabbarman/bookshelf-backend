import { Router } from 'express';
import auhRoutes from './auth.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: auhRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
