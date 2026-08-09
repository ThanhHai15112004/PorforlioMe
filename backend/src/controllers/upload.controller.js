import { asyncHandler } from '#helpers/asyncHandler.js';
import { successResponse, errorResponse } from '#helpers/response.js';
import { HTTP_STATUS } from '#constants/httpStatus.js';
import { uploadImageStream, deleteImage } from '#services/upload.service.js';

/**
 * Controller tiếp nhận tệp hình ảnh từ request và đẩy lên Cloudinary
 * Endpoint: POST /api/upload/image
 */
export const uploadSingleImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return errorResponse(res, req.t('NO_FILE_PROVIDED'), HTTP_STATUS.BAD_REQUEST);
  }

  // Lấy đường dẫn thư mục tùy chỉnh hoặc sử dụng mặc định 'portfolio/projects'
  const folder = req.query.folder || req.body.folder || 'portfolio/projects';

  const result = await uploadImageStream(req.file.buffer, folder);

  return successResponse(res, result, req.t('IMAGE_UPLOAD_SUCCESS'), HTTP_STATUS.CREATED);
});

/**
 * Controller tiếp nhận yêu cầu xóa hình ảnh lưu trữ trên Cloudinary
 * Endpoint: DELETE /api/upload/image/* hoặc DELETE /api/upload/image
 */
export const deleteSingleImage = asyncHandler(async (req, res) => {
  // Trích xuất public_id từ đường dẫn wildcard (*), query string hoặc body
  const publicId = req.params[0] || req.params.public_id || req.query.public_id || req.body.public_id;

  if (!publicId || typeof publicId !== 'string' || !publicId.trim()) {
    return errorResponse(res, req.t('PUBLIC_ID_REQUIRED'), HTTP_STATUS.BAD_REQUEST);
  }

  const result = await deleteImage(publicId.trim());

  return successResponse(res, { public_id: publicId, result }, req.t('IMAGE_DELETE_SUCCESS'), HTTP_STATUS.OK);
});

