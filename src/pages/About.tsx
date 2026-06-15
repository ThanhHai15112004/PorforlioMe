import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function About() {
  const skills = ['React', 'TypeScript', 'Node.js', 'Vite', 'Tailwind CSS', 'Git', 'RESTful API', 'SQL & NoSQL'];

  return (
    <div className="py-12 animate-fade-in max-w-3xl mx-auto px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-4">
          Giới thiệu
        </h1>
        <p className="text-slate-400">
          Một chút thông tin về bản thân tôi và kỹ năng phát triển phần mềm.
        </p>
      </div>

      <Card hoverable={false} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Tôi là ai?</h2>
          <p className="text-slate-300 leading-relaxed">
            Tôi là một lập trình viên Front-End đầy nhiệt huyết, yêu thích việc xây dựng các giao diện web đẹp mắt, tương tác mượt mà và tối ưu hóa trải nghiệm người dùng. Tôi luôn học hỏi và áp dụng những công nghệ mới nhất như React, TypeScript và Tailwind CSS vào các dự án thực tế.
          </p>
        </div>

        <div className="border-t border-slate-800/80 pt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Kỹ năng chuyên môn</h2>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-1.5 text-sm font-medium text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg cursor-default transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Muốn hợp tác làm việc?</h3>
            <p className="text-slate-400 text-sm">Gửi tin nhắn cho tôi qua trang Liên hệ để cùng thảo luận.</p>
          </div>
          <Link to="/contact">
            <Button variant="primary">Liên hệ ngay</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

