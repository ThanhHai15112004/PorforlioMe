import transporter from '#config/mailer.js';
import { env } from '#config/env.js';

/**
 * Dịch vụ tự động gửi email thông báo cho Admin khi có tin nhắn liên hệ mới
 * @param {Object} contactData - Thông tin người liên hệ
 * @param {string} contactData.name - Tên người liên hệ
 * @param {string} contactData.email - Địa chỉ email của người liên hệ
 * @param {string} contactData.message - Nội dung tin nhắn
 * @returns {Promise<any>} Phản hồi kết quả gửi mail từ Nodemailer
 */
export const sendContactNotificationMail = async ({ name, email, message }) => {
  const recipient = env.EMAIL_FROM || env.EMAIL_USER;

  // Xây dựng giao diện HTML email thông báo hiện đại
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; color: #1f2937;">
      <div style="text-align: center; border-bottom: 2px solid #6366f1; padding-bottom: 16px; margin-bottom: 24px;">
        <h2 style="color: #4f46e5; margin: 0; font-size: 20px;">📩 Tin Nhắn Liên Hệ Mới từ Web Portfolio</h2>
      </div>
      
      <div style="margin-bottom: 24px;">
        <p style="font-size: 15px; margin-bottom: 12px;">
          <strong style="color: #374151;">Họ và tên:</strong> ${name}
        </p>
        <p style="font-size: 15px; margin-bottom: 12px;">
          <strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #4f46e5; text-decoration: underline;">${email}</a>
        </p>
        <p style="font-size: 15px; margin-bottom: 8px;">
          <strong style="color: #374151;">Nội dung tin nhắn:</strong>
        </p>
        <div style="background-color: #f9fafb; border-left: 4px solid #6366f1; padding: 16px; border-radius: 8px; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
      </div>

      <div style="text-align: center; border-top: 1px solid #f3f4f6; padding-top: 16px; font-size: 12px; color: #9ca3af;">
        <p style="margin: 0;">Đây là thông báo tự động được gửi từ Hệ thống Web Portfolio của Phan Thanh Hải.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Portfolio Contact" <${env.EMAIL_USER}>`,
    to: recipient,
    replyTo: email,
    subject: `[Portfolio Contact] Tin nhắn mới từ ${name}`,
    html: htmlContent,
  };

  return await transporter.sendMail(mailOptions);
};
