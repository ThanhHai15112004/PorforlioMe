import { Router } from 'express';
import { uploadSingleImage, deleteSingleImage } from '#controllers/upload.controller.js';
import { uploadSingleImageMiddleware } from '#middlewares/uploadMiddleware.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = Router();

// Tất cả các tuyến đường upload/delete đều yêu cầu xác thực Admin
router.use(authMiddleware);

// Route tải lên hình ảnh lên Cloudinary: POST /api/upload/image
router.post('/image', uploadSingleImageMiddleware, uploadSingleImage);

// Route xóa hình ảnh khỏi Cloudinary: DELETE /api/upload/image/* và DELETE /api/upload/image
router.delete('/image/*', deleteSingleImage);
router.delete('/image', deleteSingleImage);

export default router;
