import { asyncHandler } from '../helpers/asyncHandler.js';
import { successResponse } from '../helpers/response.js';
import * as healthService from '../services/health.service.js';

// Bộ điều khiển tiếp nhận yêu cầu kiểm tra trạng thái máy chủ
export const getHealth = asyncHandler(async (req, res) => {
  const data = await healthService.checkHealth(req.lang);
  return successResponse(res, data, req.t('HEALTH_CHECK_SUCCESS'));
});
