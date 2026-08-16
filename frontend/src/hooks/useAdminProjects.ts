import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  adminProjectService,
  type AdminProjectQueryParams,
} from '../services/adminProjectService';
import { getMockAdminProjects, type AdminMockProject } from '../constants/admin';
import { useLang } from '../lib/i18n';

export type FilterTab = 'all' | 'published' | 'draft' | 'featured';

// Custom Hook quản lý dữ liệu và các thao tác API cho Trang Danh Sách Dự Án Admin
export function useAdminProjects() {
  const { lang } = useLang();

  // State Quản lý danh sách dự án
  const [projects, setProjects] = useState<AdminMockProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Bộ lọc Tab, Tìm kiếm, Danh mục Tag
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Tải danh sách dự án từ Backend API (Fallback về Mock nếu gặp lỗi mạng)
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params: AdminProjectQueryParams = {
      tag: selectedTag !== 'all' ? selectedTag : undefined,
      search: searchQuery.trim() || undefined,
      isPublished:
        activeTab === 'published' ? true : activeTab === 'draft' ? false : undefined,
      featured: activeTab === 'featured' ? true : undefined,
    };

    try {
      const result = await adminProjectService.getAdminProjects(params);
      if (result && Array.isArray(result.data) && result.data.length > 0) {
        setProjects(result.data);
      } else {
        // Fallback mượt mà về dữ liệu mock nếu chưa có bản ghi DB
        setProjects(getMockAdminProjects(lang));
      }
    } catch (err: any) {
      console.warn('[Admin Projects API] Lỗi kết nối API, tự động dùng mock data:', err?.message);
      setError(err?.message || 'Không thể kết nối máy chủ');
      setProjects(getMockAdminProjects(lang));
    } finally {
      setLoading(false);
    }
  }, [selectedTag, searchQuery, activeTab, lang]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Thao tác đổi trạng thái Xuất bản (Optimistic Update + Đồng bộ API Backend)
  const togglePublished = async (id: number) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;

    const nextPublishedState = !target.isPublished;

    // 1. Optimistic Update UI ngay lập tức
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPublished: nextPublishedState } : item))
    );

    // 2. Gọi API ngầm để đồng bộ với Database
    try {
      await adminProjectService.updateProjectStatus(id, {
        isPublished: nextPublishedState,
      });
    } catch (err) {
      console.error('[API Error] Không thể cập nhật trạng thái xuất bản:', err);
      // Rollback lại state nếu lỗi
      setProjects((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isPublished: !nextPublishedState } : item))
      );
    }
  };

  // Thao tác đổi trạng thái Nổi bật (Optimistic Update + Đồng bộ API Backend)
  const toggleFeatured = async (id: number) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;

    const nextFeaturedState = !target.featured;

    // 1. Optimistic Update UI ngay lập tức
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, featured: nextFeaturedState } : item))
    );

    // 2. Gọi API ngầm để đồng bộ với Database
    try {
      await adminProjectService.updateProjectStatus(id, {
        featured: nextFeaturedState,
      });
    } catch (err) {
      console.error('[API Error] Không thể cập nhật trạng thái nổi bật:', err);
      // Rollback lại state nếu lỗi
      setProjects((prev) =>
        prev.map((item) => (item.id === id ? { ...item, featured: !nextFeaturedState } : item))
      );
    }
  };

  // Thao tác Xóa dự án (Optimistic Update + Đồng bộ API Backend)
  const deleteProject = async (id: number) => {
    const previousList = [...projects];

    // 1. Optimistic Update UI xóa khỏi màn hình
    setProjects((prev) => prev.filter((p) => p.id !== id));

    // 2. Gọi API xóa khỏi Database
    try {
      await adminProjectService.deleteProject(id);
    } catch (err) {
      console.error('[API Error] Không thể xóa dự án khỏi cơ sở dữ liệu:', err);
      // Rollback nếu có lỗi
      setProjects(previousList);
      throw err;
    }
  };

  // Tính toán số lượng dự án theo từng Tab
  const counts = useMemo(() => {
    return {
      all: projects.length,
      published: projects.filter((p) => p.isPublished).length,
      draft: projects.filter((p) => !p.isPublished).length,
      featured: projects.filter((p) => p.featured).length,
    };
  }, [projects]);

  // Danh sách Tag danh mục duy nhất
  const uniqueTags = useMemo(() => {
    const tags = Array.from(new Set(projects.map((p) => p.tag)));
    return ['all', ...tags];
  }, [projects]);

  // Lọc danh sách dự án local
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeTab === 'published' && !project.isPublished) return false;
      if (activeTab === 'draft' && project.isPublished) return false;
      if (activeTab === 'featured' && !project.featured) return false;

      if (selectedTag !== 'all' && project.tag !== selectedTag) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(q);
        const matchSlug = project.slug.toLowerCase().includes(q);
        const matchTag = project.tag.toLowerCase().includes(q);
        if (!matchTitle && !matchSlug && !matchTag) return false;
      }

      return true;
    });
  }, [projects, activeTab, selectedTag, searchQuery]);

  return {
    projects: filteredProjects,
    rawProjects: projects,
    loading,
    error,
    counts,
    uniqueTags,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    refetch: fetchProjects,
    togglePublished,
    toggleFeatured,
    deleteProject,
  };
}
