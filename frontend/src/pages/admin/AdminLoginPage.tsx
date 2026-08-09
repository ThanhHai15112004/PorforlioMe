import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useLang, pick } from '../../lib/i18n';

// Trang Đăng Nhập Admin — Chuẩn i18n 100% (Tiếng Việt & Tiếng Anh nhất quán)
export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { lang } = useLang();

  // Trạng thái Form
  const [usernameOrEmail, setUsernameOrEmail] = useState('admin@thanhhai.dev');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Xử lý gửi Form đăng nhập
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage(
        pick(
          lang,
          'Vui lòng nhập Tên đăng nhập / Email và Mật khẩu.',
          'Please enter your Username / Email and Password.'
        )
      );
      return;
    }

    setIsLoading(true);

    // Giả lập gọi API xác thực
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('admin_token', 'jwt_demo_token_123456');
      navigate('/admin/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-[#07080D] font-sans antialiased text-slate-900 dark:text-slate-100 select-none">
      {/* Khung Card Đăng nhập tối giản */}
      <div className="w-full max-w-sm rounded-3xl p-6 sm:p-8 bg-white/90 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl transition-all duration-300">
        {/* Logo & Header đồng bộ với Public Site */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-base mb-3 shadow-md">
            <span>TH</span>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-black" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Thanh Hải CMS
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {pick(
              lang,
              'Đăng nhập để quản trị trang portfolio',
              'Sign in to manage your portfolio site'
            )}
          </p>
        </div>

        {/* Thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
            <Icon icon="ant-design:warning-outlined" className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Đăng Nhập */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ô nhập Tên đăng nhập / Email */}
          <div>
            <label
              htmlFor="admin-username"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
            >
              {pick(lang, 'Tên đăng nhập / Email', 'Username / Email')}
            </label>
            <div className="relative flex items-center">
              <Icon
                icon="ant-design:user-outlined"
                className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none"
              />
              <input
                id="admin-username"
                type="text"
                required
                autoCapitalize="none"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="admin@thanhhai.dev"
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Ô nhập Mật khẩu */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {pick(lang, 'Mật khẩu', 'Password')}
              </label>
              <button
                type="button"
                className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              >
                {pick(lang, 'Quên mật khẩu?', 'Forgot password?')}
              </button>
            </div>
            <div className="relative flex items-center">
              <Icon
                icon="ant-design:lock-outlined"
                className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none"
              />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title={showPassword ? pick(lang, 'Ẩn mật khẩu', 'Hide password') : pick(lang, 'Hiện mật khẩu', 'Show password')}
              >
                <Icon
                  icon={showPassword ? 'ant-design:eye-invisible-outlined' : 'ant-design:eye-outlined'}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Tùy chọn Ghi nhớ đăng nhập */}
          <div className="flex items-center gap-2 pt-0.5">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none"
            >
              {pick(lang, 'Ghi nhớ đăng nhập', 'Remember me')}
            </label>
          </div>

          {/* Nút Submit Đăng nhập */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 mt-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Icon icon="ant-design:loading-outlined" className="w-4 h-4 animate-spin" />
                <span>{pick(lang, 'Đang xử lý...', 'Processing...')}</span>
              </>
            ) : (
              <>
                <span>{pick(lang, 'Đăng nhập', 'Sign in')}</span>
                <Icon icon="ant-design:arrow-right-outlined" className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center border-t border-slate-100 dark:border-white/5 pt-4">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {pick(
              lang,
              '© 2026 Thanh Hải Dev — Hệ thống quản trị portfolio',
              '© 2026 Thanh Hải Dev — Portfolio Management System'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
