// Bọc hàm xử lý async giúp tự động bắt lỗi và chuyển sang middleware xử lý lỗi tập trung
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
