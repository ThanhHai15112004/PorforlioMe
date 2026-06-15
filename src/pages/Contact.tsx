import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="py-12 animate-fade-in max-w-xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-4">
          Liên hệ
        </h1>
        <p className="text-slate-400">
          Hãy để lại lời nhắn, tôi sẽ phản hồi bạn sớm nhất có thể.
        </p>
      </div>

      <Card hoverable={false} className="p-8">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              ✓
            </div>
            <h2 className="text-xl font-bold text-white">Gửi thành công!</h2>
            <p className="text-slate-400 text-sm">Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn sớm.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-1.5">Họ và tên</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500/80 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500/80 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-1.5">Lời nhắn</label>
              <textarea
                id="message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Nhập nội dung lời nhắn tại đây..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500/80 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none transition-colors text-sm resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Gửi tin nhắn
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}

