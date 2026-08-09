import { Router } from 'express';
import { submitContactMessage } from '#controllers/contact.controller.js';

const router = Router();

// Route công khai dành cho khách truy cập gửi tin nhắn liên hệ: POST /api/contact
router.post('/', submitContactMessage);

export default router;
