import { Router } from 'express';
import { getProjects, getProjectDetail } from '../controllers/project.controller.js';

const router = Router();

// Đường dẫn lấy danh sách dự án: GET /api/projects
router.get('/', getProjects);

// Đường dẫn lấy chi tiết dự án theo slug: GET /api/projects/:slug
router.get('/:slug', getProjectDetail);

export default router;
