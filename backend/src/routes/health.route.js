import { Router } from 'express';
import { getHealth } from '../controllers/health.controller.js';

const router = Router();

// Đường dẫn kiểm tra trạng thái hoạt động: GET /api/health
router.get('/', getHealth);

export default router;
