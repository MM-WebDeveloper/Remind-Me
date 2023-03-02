import express from 'express';
import * as UserController from '../controllers/users';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, UserController.getAuthenticatedUser);
router.post('/register', UserController.Register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

export default router;
