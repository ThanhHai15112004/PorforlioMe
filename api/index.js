import express from 'express';
import cors from 'cors';
import appRouter from '../backend/src/routes/index.js';
import { globalErrorHandler } from '../backend/src/middlewares/errorHandler.js';
import { langMiddleware } from '../backend/src/middlewares/langMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(langMiddleware);

// Gắn router hỗ trợ cả gốc '/' và đường dẫn '/api' khi chạy trên Vercel Serverless
app.use('/api', appRouter);
app.use('/', appRouter);

app.use(globalErrorHandler);

export default app;
