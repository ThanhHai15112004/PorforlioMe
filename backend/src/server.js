import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import appRouter from './routes/index.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';
import { langMiddleware } from './middlewares/langMiddleware.js';
import { getMessage } from './lang/index.js';

const app = express();

// Đăng ký các Middleware hệ thống
app.use(cors());
app.use(express.json());
app.use(langMiddleware);

// Đăng ký các API Routes
app.use('/api', appRouter);

// Xử lý khi truy cập vào đường dẫn không tồn tại (404 Not Found)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Đăng ký Middleware xử lý lỗi tập trung
app.use(globalErrorHandler);

// Khởi chạy máy chủ Express trong môi trường local (chỉ lắng nghe cổng khi không chạy trên Vercel Serverless)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(env.PORT, () => {
    console.log(`${getMessage('SERVER_LISTENING')} http://localhost:${env.PORT}`);
  });
}

// Xuất đối tượng app làm handler chuẩn cho Vercel Serverless Functions
export default app;
