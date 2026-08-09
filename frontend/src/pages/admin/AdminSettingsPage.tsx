import { useState, type FormEvent } from 'react';
import { Icon } from '@iconify/react';
import { getMockAdminSettings, type AdminSettingsData } from '../../constants';
import { useLang, pick } from '../../lib/i18n';

type SettingsTab = 'profile' | 'security' | 'seo';

// Trang Cài Đặt Hệ Thống & Bảo Mật Admin CMS (/admin/settings)
export default function AdminSettingsPage() {
  const { lang } = useLang();

  // Active Settings Tab
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Form Settings Data
  const [settings, setSettings] = useState<AdminSettingsData>(() => getMockAdminSettings());

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Saving State & Toast
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Submit Profile & SEO Form
  const handleSubmitSettings = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      showToast(pick(lang, 'Đã lưu cấu hình cài đặt thành công!', 'Settings saved successfully!'));
    }, 600);
  };

  // Submit Password Form
  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    if (newPassword !== confirmPassword) {
      showToast(pick(lang, 'Mật khẩu mới xác nhận không khớp!', 'New password confirmation does not match!'));
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast(pick(lang, 'Đã đổi mật khẩu thành công!', 'Password changed successfully!'));
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Trang Cài Đặt System */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.07] dark:border-white/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span>Thanh Hải</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {pick(lang, 'Cài đặt hệ thống', 'System Settings')}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {pick(lang, 'Cấu hình tài khoản & trang web', 'Account Profile & Website Configuration')}
          </h1>
        </div>

        {/* Thông báo Toast */}
        {toastMessage && (
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Icon icon="ant-design:check-circle-outlined" className="w-3.5 h-3.5" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* 2. Điều Hướng 3 Tab Cài Đặt */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'profile'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:user-outlined" className="w-4 h-4" />
          <span>{pick(lang, 'Hồ sơ Admin', 'Admin Profile')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'security'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:lock-outlined" className="w-4 h-4" />
          <span>{pick(lang, 'Bảo mật & Mật khẩu', 'Security & Password')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'seo'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:global-outlined" className="w-4 h-4" />
          <span>{pick(lang, 'SEO & Mạng xã hội', 'SEO & Social Links')}</span>
        </button>
      </div>

      {/* ================= TAB 1: HỒ SƠ ADMIN ================= */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmitSettings} className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3 flex items-center gap-2">
            <Icon icon="ant-design:user-outlined" className="w-4 h-4 text-blue-600" />
            <span>{pick(lang, 'Thông tin cá nhân Admin', 'Admin Personal Information')}</span>
          </h3>

          {/* Avatar Upload Preview */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600/30 shrink-0">
              <img
                src={settings.avatarUrl}
                alt="Avatar Admin"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1 flex-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                {pick(lang, 'Đường dẫn Ảnh Đại Diện (Avatar URL)', 'Avatar Image URL')}
              </label>
              <input
                type="url"
                value={settings.avatarUrl}
                onChange={(e) => setSettings((prev) => ({ ...prev, avatarUrl: e.target.value }))}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tên hiển thị */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Tên hiển thị (*)', 'Display Name (*)')}
              </label>
              <input
                type="text"
                required
                value={settings.name}
                onChange={(e) => setSettings((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Thanh Hải"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Email quản trị */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Email Quản Trị (*)', 'Admin Email (*)')}
              </label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="thanhhai.dev@example.com"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-white/5">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-60"
            >
              <Icon icon="ant-design:save-outlined" className="w-4 h-4" />
              <span>{pick(lang, 'Lưu hồ sơ', 'Save Profile')}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================= TAB 2: BẢO MẬT & ĐỔI MẬT KHẨU ================= */}
      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-5 max-w-xl">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3 flex items-center gap-2">
            <Icon icon="ant-design:lock-outlined" className="w-4 h-4 text-blue-600" />
            <span>{pick(lang, 'Thay đổi mật khẩu tài khoản Admin', 'Change Admin Account Password')}</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {pick(lang, 'Mật khẩu hiện tại (*)', 'Current Password (*)')}
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {pick(lang, 'Mật khẩu mới (*)', 'New Password (*)')}
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {pick(lang, 'Xác nhận mật khẩu mới (*)', 'Confirm New Password (*)')}
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-white/5">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-60"
            >
              <Icon icon="ant-design:key-outlined" className="w-4 h-4" />
              <span>{pick(lang, 'Đổi mật khẩu', 'Update Password')}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================= TAB 3: SEO & MẠNG XÃ HỘI ================= */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSubmitSettings} className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3 flex items-center gap-2">
            <Icon icon="ant-design:global-outlined" className="w-4 h-4 text-blue-600" />
            <span>{pick(lang, 'Cấu hình SEO Meta & Các liên kết Mạng Xã Hội', 'SEO Meta & Social Links Configuration')}</span>
          </h3>

          {/* SEO Meta */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Tiêu đề SEO Mặc định (SEO Title)', 'Default SEO Title')}
              </label>
              <input
                type="text"
                value={settings.seoTitle}
                onChange={(e) => setSettings((prev) => ({ ...prev, seoTitle: e.target.value }))}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Mô tả Meta Mặc định (Meta Description)', 'Default Meta Description')}
              </label>
              <textarea
                rows={3}
                value={settings.seoDescription}
                onChange={(e) => setSettings((prev) => ({ ...prev, seoDescription: e.target.value }))}
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Links Social */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              {pick(lang, 'Đường dẫn liên kết Mạng Xã Hội', 'Social Media Links')}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  GitHub Repository / Profile
                </label>
                <input
                  type="url"
                  value={settings.githubUrl}
                  onChange={(e) => setSettings((prev) => ({ ...prev, githubUrl: e.target.value }))}
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={settings.linkedinUrl}
                  onChange={(e) => setSettings((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Facebook Page / Profile
                </label>
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings((prev) => ({ ...prev, facebookUrl: e.target.value }))}
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Số điện thoại Zalo
                </label>
                <input
                  type="text"
                  value={settings.zaloUrl}
                  onChange={(e) => setSettings((prev) => ({ ...prev, zaloUrl: e.target.value }))}
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-white/5">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-60"
            >
              <Icon icon="ant-design:save-outlined" className="w-4 h-4" />
              <span>{pick(lang, 'Lưu cài đặt SEO & Social', 'Save SEO & Social Settings')}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
