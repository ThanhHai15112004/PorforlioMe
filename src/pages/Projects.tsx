import { Link } from 'react-router-dom';
import { PROJECTS_LIST } from '../constants';
import Card from '../components/common/Card';

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-4">
          Dự án của tôi
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Dưới đây là một số dự án tiêu biểu mà tôi đã thực hiện. Click vào từng dự án để xem chi tiết thông tin Case Study.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {PROJECTS_LIST.map((project) => (
          <Card key={project.id} className="group flex flex-col justify-between">
            <div>
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-indigo-400 bg-indigo-500/10 rounded-full mb-4">
                {project.tag}
              </span>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h2>
              <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                {project.description}
              </p>
            </div>
            <Link 
              to={`/projects/${project.id}`} 
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors mt-4 self-start"
            >
              Xem chi tiết 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

