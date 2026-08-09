import cloudinary from '#config/cloudinary.js';

/**
 * Dịch vụ tải ảnh lên Cloudinary trực tiếp từ luồng dữ liệu Buffer trong RAM
 * @param {Buffer} fileBuffer - Dữ liệu tệp hình ảnh dạng Buffer
 * @param {string} folder - Thư mục phân loại lưu trữ trên Cloudinary
 * @returns {Promise<{url: string, public_id: string, format: string, width: number, height: number}>}
 */
export const uploadImageStream = (fileBuffer, folder = 'portfolio/projects') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder || 'portfolio/projects',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Dịch vụ xóa tệp hình ảnh lưu trữ trên Cloudinary bằng public_id
 * @param {string} publicId - Mã nhận dạng duy nhất của hình ảnh trên Cloudinary
 * @returns {Promise<any>} Kết quả phản hồi từ Cloudinary API
 */
export const deleteImage = async (publicId) => {
  if (!publicId || typeof publicId !== 'string' || !publicId.trim()) {
    return null;
  }
  return await cloudinary.uploader.destroy(publicId.trim());
};
