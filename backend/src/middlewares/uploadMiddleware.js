import multer from 'multer';
import { HTTP_STATUS } from '#constants/httpStatus.js';
import { errorResponse } from '#helpers/response.js';

// Cấu hình Multer lưu tệp hình ảnh trực tiếp vào bộ nhớ tạm RAM (Memory Storage)
const storage = multer.memoryStorage();

// Hàm kiểm tra và lọc các loại định dạng tệp tin được phép tải lên
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('INVALID_FILE_TYPE');
    error.code = 'INVALID_FILE_TYPE';
    cb(error, false);
  }
};

// Khởi tạo đối tượng Multer với dung lượng tối đa 5MB và bộ lọc tệp
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 Megabytes
  },
  fileFilter,
});

// Middleware bọc lấy tệp hình ảnh duy nhất từ trường 'image' trong form data
export const uploadSingleImageMiddleware = (req, res, next) => {
  const uploadSingle = upload.single('image');

  uploadSingle(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return errorResponse(res, req.t('FILE_TOO_LARGE'), HTTP_STATUS.BAD_REQUEST);
      }
      if (err.code === 'INVALID_FILE_TYPE') {
        return errorResponse(res, req.t('INVALID_FILE_TYPE'), HTTP_STATUS.BAD_REQUEST);
      }
      return errorResponse(res, req.t('VALIDATION_ERROR'), HTTP_STATUS.BAD_REQUEST);
    }
    next();
  });

};
