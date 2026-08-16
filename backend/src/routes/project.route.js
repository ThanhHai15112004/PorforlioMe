import { Router } from 'express';
import {
  getProjects,
  getAdminProjects,
  getAdminProjectDetail,
  getProjectDetail,
  createProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
} from '#controllers/project.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = Router();

// --- 🌐 CLIENT PUBLIC ROUTES (Công khai cho khách truy cập) ---

// Lấy danh sách dự án công khai (hỗ trợ phân trang & lọc tag): GET /api/projects
router.get('/', getProjects);

// Lấy chi tiết dự án theo slug (cho Public Client): GET /api/projects/:slug
router.get('/:slug', getProjectDetail);


// --- 🔐 ADMIN MANAGEMENT ROUTES (Yêu cầu đăng nhập Admin role: 1) ---

// Lấy tất cả dự án gồm cả nháp cho Admin: GET /api/projects/admin/all
router.get('/admin/all', authMiddleware, getAdminProjects);

// Lấy thông tin thô đầy đủ dự án theo ID cho Admin Form Editor: GET /api/projects/admin/:id
router.get('/admin/:id', authMiddleware, getAdminProjectDetail);

// Tạo mới dự án: POST /api/projects
router.post('/', authMiddleware, createProject);

// Cập nhật toàn bộ dự án: PUT /api/projects/:id
router.put('/:id', authMiddleware, updateProject);

// Cập nhật trạng thái nổi bật / nháp / thứ tự: PATCH /api/projects/:id/status
router.patch('/:id/status', authMiddleware, updateProjectStatus);

// Xóa vĩnh viễn dự án: DELETE /api/projects/:id
router.delete('/:id', authMiddleware, deleteProject);

export default router;
