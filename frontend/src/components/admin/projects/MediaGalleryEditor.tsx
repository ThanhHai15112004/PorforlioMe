import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { uploadService } from '../../../services/uploadService';
import { useLang } from '../../../lib/i18n';

interface MediaGalleryEditorProps {
  coverImage: string;
  onCoverChange: (url: string) => void;
}

export default function MediaGalleryEditor({
  coverImage,
  onCoverChange,
}: MediaGalleryEditorProps) {
  const { t } = useLang();
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploadingCover(true);
    setUploadError(null);

    try {
      const result = await uploadService.uploadImage(file, 'portfolio/projects/cover');
      if (result && result.url) {
        onCoverChange(result.url);
      }
    } catch (err: any) {
      console.error('[Cover Upload Error]:', err);
      setUploadError(err?.message ? String(err.message) : t('UPLOAD_ERROR_DEFAULT'));
    } finally {
      setIsUploadingCover(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onCoverChange(urlInput.trim());
      setUrlInput('');
    }
  };

  return (
    <div className="space-y-6">
      {uploadError && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold flex items-center justify-between border border-rose-200 dark:border-rose-800">
          <div className="flex items-center gap-2">
            <Icon icon="ant-design:warning-outlined" className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button type="button" onClick={() => setUploadError(null)} className="text-rose-500 hover:underline">
            {t('CLOSE')}
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
            <Icon icon="ant-design:picture-outlined" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t('COVER_IMAGE_TITLE')}</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('COVER_IMAGE_DESC')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 aspect-video bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center relative overflow-hidden group">
            {isUploadingCover ? (
              <div className="flex flex-col items-center justify-center p-4 text-center text-blue-600 dark:text-blue-400">
                <Icon icon="ant-design:loading-outlined" className="w-8 h-8 animate-spin mb-2" />
                <span className="text-xs font-semibold">Đang tải lên...</span>
              </div>
            ) : coverImage ? (
              <>
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform">
                    <Icon icon="ant-design:edit-outlined" className="w-5 h-5" />
                  </button>
                  <button onClick={() => onCoverChange('')} className="p-2 bg-rose-500 rounded-full text-white hover:scale-110 transition-transform">
                    <Icon icon="ant-design:delete-outlined" className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-2">
                    <Icon icon="ant-design:cloud-upload-outlined" className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold">Bấm để tải ảnh từ máy tính</span>
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/png, image/jpeg, image/webp" className="hidden" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <Icon icon="ant-design:link-outlined" className="w-4 h-4" />
                HOẶC NHẬP ĐƯỜNG DẪN ẢNH (URL)
              </h5>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.png"
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button onClick={handleUrlSubmit} className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors">
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
