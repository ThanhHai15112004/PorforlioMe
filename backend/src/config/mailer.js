import nodemailer from 'nodemailer';
import { env } from '#config/env.js';

// Khởi tạo Nodemailer Transporter kết nối dịch vụ Gmail SMTP
const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  secure: Number(env.EMAIL_PORT) === 465, // True cho cổng 465, False cho cổng 587
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export default transporter;
