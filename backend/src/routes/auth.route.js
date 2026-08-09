import { Router } from 'express';
import { login, getMe, changePassword } from '#controllers/auth.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = Router();

// Đường dẫn đăng nhập công khai: POST /api/auth/login
router.post('/login', login);

// Đường dẫn lấy thông tin me: GET /api/auth/me (Yêu cầu Token Admin)
router.get('/me', authMiddleware, getMe);

// Đường dẫn đổi mật khẩu: PUT /api/auth/change-password (Yêu cầu Token Admin)
router.put('/change-password', authMiddleware, changePassword);

export default router;
