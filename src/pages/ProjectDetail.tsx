import { useParams, Link } from 'react-router-dom';
import { PROJECTS_LIST } from '../constants';
import Card from '../components/common/Card';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();

  const project = PROJECTS_LIST.find((p) => p.id === id);

  return (
    <div className="py-12 animate-fade-in max-w-3xl mx-auto">
      <Link 
        to="/projects" 
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <span>←</span> Quay lại danh sách dự án
      </Link>

      {project ? (
        <Card hoverable={false} className="p-8">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Chi tiết dự án / Case Study
          </h1>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {project.title}
          </h2>
          
          <p className="text-slate-400 text-lg mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="border-t border-slate-800/80 pt-6 mt-6">
            <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">Tổng quan Case Study</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              {project.detail}
            </p>

            <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">Công nghệ sử dụng</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-3 py-1 text-xs font-mono text-slate-300 bg-slate-800 rounded-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <Card hoverable={false} className="text-center p-12">
          <h1 className="text-3xl font-bold text-red-400 mb-4">
            Chi tiết dự án / Case Study
          </h1>
          <p className="text-slate-400 mb-6">
            Không tìm thấy dự án với ID: <code className="bg-slate-800 px-2 py-1 rounded text-red-300">{id}</code>
          </p>
          <Link to="/projects" className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium">
            Xem các dự án khác
          </Link>
        </Card>
      )}
    </div>
  );
}

