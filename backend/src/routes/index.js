import { Router } from 'express';
import healthRouter from './health.route.js';
import projectRouter from './project.route.js';

const router = Router();

// Gom tất cả các router con vào router trung tâm
router.use('/health', healthRouter);
router.use('/projects', projectRouter);

export default router;
