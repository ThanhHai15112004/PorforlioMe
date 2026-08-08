import { HTTP_STATUS } from '../constants/httpStatus.js';

// Phản hồi phản hồi thành công chuẩn định dạng JSON
export const successResponse = (res, data = null, message = 'Success', statusCode = HTTP_STATUS.OK) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Phản hồi phản hồi thất bại / lỗi chuẩn định dạng JSON
export const errorResponse = (res, message = 'Error', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
