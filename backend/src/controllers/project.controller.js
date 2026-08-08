import { asyncHandler } from '../helpers/asyncHandler.js';
import { successResponse, errorResponse } from '../helpers/response.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as projectService from '../services/project.service.js';

// Bộ điều khiển lấy danh sách toàn bộ dự án
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.getAllProjects();
  return successResponse(res, projects, req.t('PROJECTS_FETCHED'));
});

// Bộ điều khiển lấy thông tin chi tiết dự án theo slug
export const getProjectDetail = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const project = await projectService.getProjectBySlug(slug);

  if (!project) {
    return errorResponse(res, req.t('PROJECT_NOT_FOUND'), HTTP_STATUS.NOT_FOUND);
  }

  return successResponse(res, project, req.t('PROJECTS_FETCHED'));
});
