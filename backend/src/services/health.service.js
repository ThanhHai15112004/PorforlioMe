import { getMessage } from '../lang/index.js';

// Dịch vụ kiểm tra trạng thái hoạt động của máy chủ
export const checkHealth = async (lang) => {
  return {
    status: 'ok',
    message: getMessage('SERVER_OK', lang),
    timestamp: new Date().toISOString(),
  };
};
