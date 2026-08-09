// Từ điển thông báo phản hồi và nhật ký hệ thống tiếng Việt
export default {
  // Thông báo phản hồi chung (General Responses)
  SERVER_OK: 'Máy chủ backend đang hoạt động bình thường!',
  SUCCESS: 'Thao tác xử lý thành công',
  NOT_FOUND: 'Không tìm thấy tài nguyên yêu cầu',
  INTERNAL_ERROR: 'Đã xảy ra lỗi máy chủ nội bộ',
  VALIDATION_ERROR: 'Dữ liệu đầu vào không hợp lệ',
  REQUIRED_FIELDS_MISSING: 'Các trường bắt buộc không được để rỗng',

  // Thông báo xác thực & phân quyền (Auth & Authorization)
  UNAUTHORIZED_NO_TOKEN: 'Bạn chưa đăng nhập hoặc thiếu token xác thực',
  FORBIDDEN_ADMIN_ONLY: 'Bạn không có quyền quản trị để thực hiện thao tác này',
  TOKEN_EXPIRED: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại',
  TOKEN_INVALID: 'Token xác thực không hợp lệ',
  LOGIN_SUCCESS: 'Đăng nhập hệ thống quản trị thành công',
  LOGIN_CREDENTIALS_REQUIRED: 'Tên đăng nhập và mật khẩu là bắt buộc',
  INVALID_CREDENTIALS: 'Mật khẩu không chính xác',
  ACCOUNT_NOT_FOUND: 'Tài khoản không tồn tại trên hệ thống',
  ACCOUNT_DISABLED: 'Tài khoản của bạn đã bị khóa',
  GET_ME_SUCCESS: 'Lấy thông tin tài khoản thành công',
  CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại',
  OLD_PASSWORD_INVALID: 'Mật khẩu hiện tại không chính xác',
  NEW_PASSWORD_TOO_SHORT: 'Mật khẩu mới phải có tối thiểu 6 ký tự',

  // Thông báo dự án (Projects Module)
  PROJECT_NOT_FOUND: 'Không tìm thấy dự án yêu cầu',
  PROJECTS_FETCHED: 'Lấy danh sách dự án thành công',
  PROJECT_CREATE_SUCCESS: 'Tạo mới dự án thành công',
  PROJECT_UPDATE_SUCCESS: 'Cập nhật thông tin dự án thành công',
  PROJECT_DELETE_SUCCESS: 'Xóa dự án thành công',
  PROJECT_STATUS_UPDATE_SUCCESS: 'Cập nhật trạng thái dự án thành công',
  PROJECT_SLUG_EXISTS: 'Slug dự án đã tồn tại trên hệ thống',
  PROJECT_TAG_ROLE_TIMELINE_REQUIRED: 'Các trường tag, role và timeline là bắt buộc',
  PROJECT_TRANSLATION_REQUIRED: 'Vui lòng cung cấp ít nhất 1 bản dịch tiêu đề dự án',

  HEALTH_CHECK_SUCCESS: 'Kiểm tra trạng thái máy chủ thành công',

  // Các câu nhật ký hệ thống (Console Log)
  SERVER_LISTENING: '[Backend] Máy chủ đang chạy tại cổng',
  GLOBAL_ERROR_LOG: '[Lỗi hệ thống toàn cục]',
  ROUTE_NOT_FOUND_LOG: '[Lỗi không tìm thấy đường dẫn]',
};
