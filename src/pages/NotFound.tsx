import { useLang, pick } from '../lib/i18n';

export default function NotFound() {
  const { lang } = useLang();
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
        {pick(lang, '404 - Không tìm thấy trang', '404 - Page not found')}
      </h1>
      <p className="text-slate-400">
        {pick(lang, 'Đường dẫn này không tồn tại hoặc đã được di chuyển.', 'This path does not exist or has been moved.')}
      </p>
    </div>
  );
}
