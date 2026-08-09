import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { getMockAdminMessages, type AdminMockMessage } from '../../constants';
import { useLang, pick } from '../../lib/i18n';
import AdminMessageReplyModal from '../../components/admin/messages/AdminMessageReplyModal';

type MessageTab = 'all' | 'unread' | 'archived';

// Trang Hòm Thư Liên Hệ CMS Admin (/admin/messages) — Split View 2 Cột Desktop & Drilldown Mobile
export default function AdminMessagesPage() {
  const { lang } = useLang();

  // State Danh sách tin nhắn mẫu
  const [messages, setMessages] = useState<AdminMockMessage[]>(() => getMockAdminMessages(lang));
  const [activeTab, setActiveTab] = useState<MessageTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // State Tin nhắn đang được chọn xem chi tiết (Mặc định là tin nhắn đầu tiên)
  const [selectedId, setSelectedId] = useState<string>(() => (messages[0] ? messages[0].id : ''));

  // State chế độ xem trên Mobile ('list' hoặc 'detail')
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  // State Modal trả lời email
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  // State Thông báo Toast
  const [toastMessage, setToastMessage] = useState('');

  // Đếm số lượng theo tab
  const counts = useMemo(() => {
    return {
      all: messages.filter((m) => m.status !== 'archived').length,
      unread: messages.filter((m) => m.status === 'unread').length,
      archived: messages.filter((m) => m.status === 'archived').length,
    };
  }, [messages]);

  // Lọc danh sách tin nhắn theo Tab & Từ khóa tìm kiếm
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      // Lọc theo Tab
      if (activeTab === 'unread' && msg.status !== 'unread') return false;
      if (activeTab === 'archived' && msg.status !== 'archived') return false;
      if (activeTab === 'all' && msg.status === 'archived') return false;

      // Lọc theo Từ khóa tìm kiếm
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = msg.name.toLowerCase().includes(q);
        const matchEmail = msg.email.toLowerCase().includes(q);
        const matchSubject = msg.subject.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchSubject) return false;
      }

      return true;
    });
  }, [messages, activeTab, searchQuery]);

  // Tìm đối tượng tin nhắn đang được chọn
  const selectedMessage = useMemo(() => {
    return messages.find((m) => m.id === selectedId) || filteredMessages[0] || null;
  }, [messages, selectedId, filteredMessages]);

  // Chọn tin nhắn để xem
  const handleSelectMessage = (msg: AdminMockMessage) => {
    setSelectedId(msg.id);
    setMobileView('detail');

    // Tự động đánh dấu đã đọc khi xem
    if (msg.status === 'unread') {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: 'read' } : m))
      );
    }
  };

  // Đổi trạng thái Đã đọc / Chưa đọc
  const toggleReadStatus = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          const nextStatus = m.status === 'unread' ? 'read' : 'unread';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  // Đổi trạng thái Lưu trữ / Bỏ lưu trữ
  const toggleArchiveStatus = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          const nextStatus = m.status === 'archived' ? 'read' : 'archived';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
    showToast(pick(lang, 'Đã cập nhật trạng thái lưu trữ!', 'Archive status updated!'));
  };

  // Xóa tin nhắn
  const handleDeleteMessage = (msgId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    setMobileView('list');
    showToast(pick(lang, 'Đã xóa tin nhắn!', 'Message deleted!'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Trang Hòm Thư Liên Hệ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.07] dark:border-white/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span>Thanh Hải</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {pick(lang, 'Hòm thư liên hệ', 'Messages Inbox')}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {pick(lang, 'Tin nhắn từ khách truy cập', 'Visitor Contact Messages')}
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

      {/* 2. Thanh Tab & Ô Tìm Kiếm */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* 3 Tab lọc chính (Tất cả, Chưa đọc, Đã lưu trữ) */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100/80 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:mail-outlined" className="w-3.5 h-3.5" />
            <span>{pick(lang, 'Tất cả tin nhắn', 'All Messages')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[10px] font-bold">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('unread')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'unread'
                ? 'bg-white dark:bg-[#0D0F17] text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:bell-outlined" className="w-3.5 h-3.5 text-rose-500" />
            <span>{pick(lang, 'Chưa đọc', 'Unread')}</span>
            {counts.unread > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                {counts.unread}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('archived')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'archived'
                ? 'bg-white dark:bg-[#0D0F17] text-slate-800 dark:text-slate-200 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:inbox-outlined" className="w-3.5 h-3.5" />
            <span>{pick(lang, 'Đã lưu trữ', 'Archived')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-200/60 dark:bg-white/10 text-[10px] font-bold">
              {counts.archived}
            </span>
          </button>
        </div>

        {/* Ô Tìm Kiếm theo Tên / Email / Tiêu đề */}
        <div className="relative w-full md:w-64">
          <Icon
            icon="ant-design:search-outlined"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={pick(lang, 'Tìm tên, email, tiêu đề...', 'Search name, email...')}
            className="w-full h-9 pl-9 pr-3 rounded-full bg-white/80 dark:bg-white/5 border border-black/[0.07] dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* 3. Bố Cục Split View (Desktop 2 Cột 35% / 65% & Mobile Full Screen Drilldown) */}
      <div className="glass-card elevate-sm rounded-3xl bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl overflow-hidden shadow-sm min-h-[550px] flex">
        {/* ================= CỘT TRÁI (35% - Danh sách tin nhắn) ================= */}
        <div
          className={`w-full md:w-[35%] border-r border-black/[0.07] dark:border-white/10 flex flex-col ${
            mobileView === 'detail' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="p-3.5 border-b border-black/[0.05] dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-xs font-bold text-slate-400">
            <span>{pick(lang, 'Danh sách tin nhắn', 'Messages List')}</span>
            <span>({filteredMessages.length})</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-black/[0.05] dark:divide-white/5">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center text-slate-400">
                <Icon icon="ant-design:inbox-outlined" className="w-8 h-8 mb-2" />
                <p className="text-xs font-semibold">
                  {pick(lang, 'Không có tin nhắn nào', 'No messages in this folder')}
                </p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                const isUnread = msg.status === 'unread';

                return (
                  <button
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`w-full text-left p-4 transition-all relative flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-blue-50/60 dark:bg-blue-950/30 border-l-4 border-blue-600'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                        <span
                          className={`text-xs truncate ${
                            isUnread
                              ? 'font-extrabold text-slate-900 dark:text-white'
                              : 'font-semibold text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                        {msg.time}
                      </span>
                    </div>

                    <h4
                      className={`text-xs truncate ${
                        isUnread
                          ? 'font-bold text-slate-900 dark:text-white'
                          : 'font-medium text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {msg.subject}
                    </h4>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {msg.content}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ================= CỘT PHẢI (65% - Khung xem chi tiết tin nhắn) ================= */}
        <div
          className={`w-full md:w-[65%] flex flex-col ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {selectedMessage ? (
            <div className="flex-1 flex flex-col">
              {/* Header Khung Chi Tiết & Nút Thao Tác */}
              <div className="p-4 border-b border-black/[0.07] dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
                {/* Nút Quay lại trên Mobile */}
                <button
                  onClick={() => setMobileView('list')}
                  className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  <Icon icon="ant-design:arrow-left-outlined" className="w-3.5 h-3.5" />
                  <span>{pick(lang, 'Quay lại', 'Back')}</span>
                </button>

                {/* Badge trạng thái */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      selectedMessage.status === 'unread'
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/50'
                        : selectedMessage.status === 'archived'
                        ? 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                        : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50'
                    }`}
                  >
                    {selectedMessage.status === 'unread'
                      ? pick(lang, 'Chưa đọc', 'Unread')
                      : selectedMessage.status === 'archived'
                      ? pick(lang, 'Đã lưu trữ', 'Archived')
                      : pick(lang, 'Đã đọc', 'Read')}
                  </span>
                </div>

                {/* Cụm Nút Hành Động (Đánh dấu chưa đọc, Archive, Xóa, Trả lời) */}
                <div className="flex items-center gap-1.5 ml-auto">
                  {/* Toggle Chưa Đọc / Đã Đọc */}
                  <button
                    onClick={() => toggleReadStatus(selectedMessage.id)}
                    className="p-2 rounded-full text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                    title={
                      selectedMessage.status === 'unread'
                        ? pick(lang, 'Đánh dấu đã đọc', 'Mark as Read')
                        : pick(lang, 'Đánh dấu chưa đọc', 'Mark as Unread')
                    }
                  >
                    <Icon
                      icon={
                        selectedMessage.status === 'unread'
                          ? 'ant-design:check-circle-outlined'
                          : 'ant-design:mail-outlined'
                      }
                      className="w-4 h-4"
                    />
                  </button>

                  {/* Archive / Unarchive */}
                  <button
                    onClick={() => toggleArchiveStatus(selectedMessage.id)}
                    className="p-2 rounded-full text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                    title={
                      selectedMessage.status === 'archived'
                        ? pick(lang, 'Bỏ lưu trữ', 'Unarchive')
                        : pick(lang, 'Chuyển vào lưu trữ', 'Archive')
                    }
                  >
                    <Icon icon="ant-design:inbox-outlined" className="w-4 h-4" />
                  </button>

                  {/* Xóa tin nhắn */}
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="p-2 rounded-full text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title={pick(lang, 'Xóa tin nhắn', 'Delete Message')}
                  >
                    <Icon icon="ant-design:delete-outlined" className="w-4 h-4" />
                  </button>

                  {/* Nút Gửi Email Trả Lời Modal */}
                  <button
                    onClick={() => setIsReplyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    <Icon icon="ant-design:send-outlined" className="w-3.5 h-3.5" />
                    <span>{pick(lang, 'Trả lời Email', 'Reply Email')}</span>
                  </button>
                </div>
              </div>

              {/* Thân Nội Dung Chi Tiết Tin Nhắn */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                {/* Thông tin người gửi */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/[0.05] dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 font-bold text-sm flex items-center justify-center border border-blue-200/50">
                      {selectedMessage.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {selectedMessage.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="hover:text-blue-600 hover:underline"
                        >
                          {selectedMessage.email}
                        </a>
                        {selectedMessage.phone && (
                          <>
                            <span>•</span>
                            <span>{selectedMessage.phone}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    {selectedMessage.createdAt}
                  </span>
                </div>

                {/* Tiêu đề tin nhắn */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {pick(lang, 'Chủ đề liên hệ', 'Subject')}
                  </span>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {selectedMessage.subject}
                  </h2>
                </div>

                {/* Nội dung chi tiết */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400">
              <Icon icon="ant-design:mail-outlined" className="w-12 h-12 mb-3 text-slate-300" />
              <p className="text-xs font-semibold">
                {pick(lang, 'Chọn một tin nhắn để xem nội dung', 'Select a message to view details')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Modal Trả Lời Email */}
      <AdminMessageReplyModal
        isOpen={isReplyModalOpen}
        message={selectedMessage}
        onClose={() => setIsReplyModalOpen(false)}
        onSendSuccess={() =>
          showToast(pick(lang, 'Đã gửi email phản hồi thành công!', 'Email reply sent successfully!'))
        }
      />
    </div>
  );
}
