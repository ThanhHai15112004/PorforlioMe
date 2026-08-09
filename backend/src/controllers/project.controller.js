import { asyncHandler } from '#helpers/asyncHandler.js';
import { successResponse, errorResponse } from '#helpers/response.js';
import { HTTP_STATUS } from '#constants/httpStatus.js';
import * as projectService from '#services/project.service.js';

// Bộ điều khiển lấy danh sách dự án công khai (hỗ trợ phân trang, lọc tag, i18n)
export const getProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = 6, tag, search, featured } = req.query || {};
  const lang = req.lang; // Lấy ngôn ngữ tự động từ langMiddleware

  const result = await projectService.getProjectsList({
    page,
    limit,
    tag,
    search,
    featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
    isPublished: true, // Client chỉ xem dự án đã xuất bản
    lang,
  });

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: req.t('PROJECTS_FETCHED'),
    data: result.data,
    pagination: result.pagination,
  });
});

// Bộ điều khiển lấy danh sách toàn bộ dự án cho Admin (gồm cả bản nháp)
export const getAdminProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, tag, search, isPublished } = req.query || {};
  const lang = req.lang;

  const result = await projectService.getProjectsList({
    page,
    limit,
    tag,
    search,
    isPublished: isPublished !== undefined ? isPublished === 'true' : null,
    lang,
  });

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: req.t('PROJECTS_FETCHED'),
    data: result.data,
    pagination: result.pagination,
  });
});

// Bộ điều khiển lấy thông tin chi tiết dự án theo slug
export const getProjectDetail = asyncHandler(async (req, res) => {
  const { slug } = req.params || {};
  const lang = req.lang;

  if (!slug || typeof slug !== 'string' || !slug.trim()) {
    return errorResponse(res, req.t('PROJECT_NOT_FOUND'), HTTP_STATUS.NOT_FOUND);
  }

  const project = await projectService.getProjectDetailBySlug(slug.trim(), lang);

  if (!project) {
    return errorResponse(res, req.t('PROJECT_NOT_FOUND'), HTTP_STATUS.NOT_FOUND);
  }

  return successResponse(res, project, req.t('PROJECTS_FETCHED'));
});

// Bộ điều khiển tạo mới dự án (Chỉ Admin)
export const createProject = asyncHandler(async (req, res) => {
  const { tag, role, timeline, translations } = req.body || {};

  if (!tag || typeof tag !== 'string' || !tag.trim() ||
      !role || typeof role !== 'string' || !role.trim() ||
      !timeline || typeof timeline !== 'string' || !timeline.trim()) {
    return errorResponse(res, req.t('PROJECT_TAG_ROLE_TIMELINE_REQUIRED'), HTTP_STATUS.BAD_REQUEST);
  }

  if (!translations || !Array.isArray(translations) || translations.length === 0) {
    return errorResponse(res, req.t('PROJECT_TRANSLATION_REQUIRED'), HTTP_STATUS.BAD_REQUEST);
  }

  const project = await projectService.createNewProject(req.body);
  return successResponse(res, project, req.t('PROJECT_CREATE_SUCCESS'), HTTP_STATUS.CREATED);
});

// Bộ điều khiển cập nhật dự án theo ID (Chỉ Admin)
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params || {};
  const numId = Number(id);

  if (!id || isNaN(numId) || numId <= 0) {
    return errorResponse(res, req.t('VALIDATION_ERROR'), HTTP_STATUS.BAD_REQUEST);
  }

  const updatedProject = await projectService.updateProject(numId, req.body || {});
  return successResponse(res, updatedProject, req.t('PROJECT_UPDATE_SUCCESS'));
});

// Bộ điều khiển thay đổi trạng thái Nổi bật / Phụ bản (Chỉ Admin)
export const updateProjectStatus = asyncHandler(async (req, res) => {
  const { id } = req.params || {};
  const numId = Number(id);

  if (!id || isNaN(numId) || numId <= 0) {
    return errorResponse(res, req.t('VALIDATION_ERROR'), HTTP_STATUS.BAD_REQUEST);
  }

  const { featured, isPublished } = req.body || {};

  const updatedProject = await projectService.updateProject(numId, {
    ...(featured !== undefined && { featured: Boolean(featured) }),
    ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
  });

  return successResponse(res, updatedProject, req.t('PROJECT_STATUS_UPDATE_SUCCESS'));
});

// Bộ điều khiển xóa dự án theo ID (Chỉ Admin)
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params || {};
  const numId = Number(id);

  if (!id || isNaN(numId) || numId <= 0) {
    return errorResponse(res, req.t('VALIDATION_ERROR'), HTTP_STATUS.BAD_REQUEST);
  }

  await projectService.deleteProject(numId);
  return successResponse(res, { id: numId }, req.t('PROJECT_DELETE_SUCCESS'));
});
