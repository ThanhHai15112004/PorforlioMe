import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/ProjectDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';

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
        path: 'projects/:id',
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
      {
        path: '*',
        element: (
          <div className="text-center py-20">
            <h1 className="text-4xl font-extrabold text-white mb-4">404 - Không tìm thấy trang</h1>
            <p className="text-slate-400">Đường dẫn này không tồn tại hoặc đã được di chuyển.</p>
          </div>
        )
      }
    ],
  },
]);
