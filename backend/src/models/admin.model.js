import { prisma } from '#config/prisma.js';

// Chuẩn hóa dữ liệu Entity Admin (Loại bỏ mật khẩu khỏi kết quả trả về)
export const formatAdminEntity = (data) => {
  if (!data) return null;
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    name: data.name,
    avatar: data.avatar || null,
    role: data.role,
    isActive: Boolean(data.isActive),
    lastLogin: data.lastLogin || null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

// Tìm Admin theo tên đăng nhập
export const findAdminByUsername = async (username) => {
  return await prisma.admin.findUnique({
    where: { username },
  });
};

// Tìm Admin theo ID
export const findAdminById = async (id) => {
  const admin = await prisma.admin.findUnique({
    where: { id: Number(id) },
  });
  return formatAdminEntity(admin);
};

// Cập nhật thời gian đăng nhập gần nhất
export const updateLastLogin = async (id) => {
  return await prisma.admin.update({
    where: { id: Number(id) },
    data: { lastLogin: new Date() },
  });
};

// Cập nhật mật khẩu Admin
export const updatePassword = async (id, hashedPassword) => {
  return await prisma.admin.update({
    where: { id: Number(id) },
    data: { password: hashedPassword },
  });
};
