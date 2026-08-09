import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/ProjectDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminProjectsPage from '../pages/admin/AdminProjectsPage';
import AdminProjectDetailPage from '../pages/admin/AdminProjectDetailPage';
import AdminProjectEditPage from '../pages/admin/AdminProjectEditPage';
import AdminMessagesPage from '../pages/admin/AdminMessagesPage';
import AdminSkillsPage from '../pages/admin/AdminSkillsPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import AdminNotFoundPage from '../pages/admin/AdminNotFoundPage';

// Cấu hình Router tổng hợp cho Portfolio Public và Admin CMS
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'projects/:slug',
        element: <ProjectDetail />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboardPage />,
      },
      {
        path: 'projects',
        element: <AdminProjectsPage />,
      },
      {
        path: 'projects/new',
        element: <AdminProjectEditPage />,
      },
      {
        path: 'projects/:id',
        element: <AdminProjectDetailPage />,
      },
      {
        path: 'projects/:id/edit',
        element: <AdminProjectEditPage />,
      },
      {
        path: 'messages',
        element: <AdminMessagesPage />,
      },
      {
        path: 'skills',
        element: <AdminSkillsPage />,
      },
      {
        path: 'settings',
        element: <AdminSettingsPage />,
      },
      {
        path: '*', // Mọi đường dẫn 404 thuộc khu vực /admin sẽ giữ nguyên khung AdminLayout
        element: <AdminNotFoundPage />,
      },
    ],
  },
  {
    path: '*', // 404 cho khu vực public
    element: <NotFound />,
  },
]);
