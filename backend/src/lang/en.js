// Từ điển thông báo phản hồi và nhật ký hệ thống tiếng Anh
export default {
  // Thông báo phản hồi chung (General Responses)
  SERVER_OK: 'Backend server is running properly!',
  SUCCESS: 'Request processed successfully',
  NOT_FOUND: 'Resource not found',
  INTERNAL_ERROR: 'Internal server error occurred',
  VALIDATION_ERROR: 'Invalid input data',
  REQUIRED_FIELDS_MISSING: 'Required fields cannot be empty',

  // Thông báo xác thực & phân quyền (Auth & Authorization)
  UNAUTHORIZED_NO_TOKEN: 'Authentication token missing or invalid',
  FORBIDDEN_ADMIN_ONLY: 'Forbidden: Admin access required for this operation',
  TOKEN_EXPIRED: 'Session expired, please log in again',
  TOKEN_INVALID: 'Invalid authentication token',
  LOGIN_SUCCESS: 'Admin login successful',
  LOGIN_CREDENTIALS_REQUIRED: 'Username and password are required',
  INVALID_CREDENTIALS: 'Password is incorrect',
  ACCOUNT_NOT_FOUND: 'Account does not exist in the system',
  ACCOUNT_DISABLED: 'Your account has been disabled',
  GET_ME_SUCCESS: 'Account profile fetched successfully',
  CHANGE_PASSWORD_SUCCESS: 'Password changed successfully, please log in again',
  OLD_PASSWORD_INVALID: 'Current password is incorrect',
  NEW_PASSWORD_TOO_SHORT: 'New password must be at least 6 characters long',

  // Thông báo dự án (Projects Module)
  PROJECT_NOT_FOUND: 'Project not found',
  PROJECTS_FETCHED: 'Projects fetched successfully',
  PROJECT_CREATE_SUCCESS: 'Project created successfully',
  PROJECT_UPDATE_SUCCESS: 'Project updated successfully',
  PROJECT_DELETE_SUCCESS: 'Project deleted successfully',
  PROJECT_STATUS_UPDATE_SUCCESS: 'Project status updated successfully',
  PROJECT_SLUG_EXISTS: 'Project slug already exists in the system',
  PROJECT_TAG_ROLE_TIMELINE_REQUIRED: 'Tag, role, and timeline fields are required',
  PROJECT_TRANSLATION_REQUIRED: 'Please provide at least 1 project translation',

  HEALTH_CHECK_SUCCESS: 'Health status fetched successfully',

  // Các câu nhật ký hệ thống (Console Log)
  SERVER_LISTENING: '[Backend] Server listening on',
  GLOBAL_ERROR_LOG: '[Global Error Log]',
  ROUTE_NOT_FOUND_LOG: '[Route Not Found Log]',
};
