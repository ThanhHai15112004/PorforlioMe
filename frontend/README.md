# PorforlioMe

Dự án Portfolio cá nhân được phát triển bằng **ReactJS**, **Vite**, **TypeScript**, và **Tailwind CSS v4**.

## 🚀 Tính năng nổi bật
- **Định tuyến SPA mượt mà:** Sử dụng `react-router-dom` v6 để quản lý 5 trang điều hướng không tải lại trang.
- **Dữ liệu tập trung:** Các thông tin quan trọng được khai báo tập trung trong `src/constants/index.ts`.
- **Giao diện hiện đại:** Thiết kế tối (Dark Mode) cao cấp kết hợp với hiệu ứng kính mờ (glassmorphism) và gradient màu sắc hài hòa.
- **Kiến trúc mã nguồn chuẩn:** Chia cấu trúc thư mục rõ ràng bao gồm layouts, components/common, shared UI (Card, Button), và pages.
- **Trang chi tiết động:** Hỗ trợ xem thông tin Case Study động bằng Route parameter (`/projects/:id`).

## 📁 Cấu trúc thư mục chính
```text
src/
├── components/
│   └── common/          # Component dùng chung & Shared UI (Button, Card, Header, Footer)
├── constants/           # Quản lý hằng số dữ liệu tĩnh (menu, dự án, social)
├── layouts/             # Bố cục giao diện chung (MainLayout)
├── pages/               # 5 trang nội dung (Home, Projects, ProjectDetail, About, Contact)
├── routes/              # Thiết lập định tuyến react-router
├── App.tsx              # Tích hợp RouterProvider
└── index.css            # Khai báo Tailwind CSS v4 & custom style
```

## 🛠️ Cài đặt & Chạy dưới local
1. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
2. Chạy môi trường phát triển (Development):
   ```bash
   npm run dev
   ```
3. Biên dịch dự án (Build):
   ```bash
   npm run build
   ```
