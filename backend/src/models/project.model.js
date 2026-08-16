import { prisma } from '#config/prisma.js';

/**
 * Phẳng hóa dữ liệu dự án trả về theo một ngôn ngữ cụ thể (vi / en...) cho Client Public
 */
export const formatProjectFlat = (project, lang = 'vi', indexStr = '01') => {
  if (!project) return null;

  // Lấy bản dịch theo ngôn ngữ lang hoặc lấy bản dịch đầu tiên nếu không tìm thấy
  const translation = project.translations?.find((t) => t.lang === lang) || project.translations?.[0] || {};

  const techList = Array.isArray(project.techStack) ? project.techStack : [];

  return {
    id: project.id,
    slug: project.slug,
    index: indexStr,
    lang: translation.lang || lang,
    title: translation.title || '',
    description: translation.description || '',
    highlights: Array.isArray(translation.highlights) ? translation.highlights : [],
    tag: project.tag || '',
    role: project.role || '',
    timeline: project.timeline || '',
    techStack: techList,
    tech: techList, // Alias tương thích với Frontend Client
    images: Array.isArray(project.images) ? project.images : [],
    demoUrl: project.demoUrl || null,
    githubUrl: project.githubUrl || null,
    featured: Boolean(project.featured),
    isPublished: Boolean(project.isPublished),
    order: project.order || 0,
    content: translation.content || null,
    metaTitle: translation.metaTitle || null,
    metaDescription: translation.metaDescription || null,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};

/**
 * Định dạng dữ liệu dự án đầy đủ nguyên thể cho Admin CMS (chứa mảng tất cả các bản dịch)
 */
export const formatProjectRawForAdmin = (project) => {
  if (!project) return null;

  const techList = Array.isArray(project.techStack) ? project.techStack : [];

  return {
    id: project.id,
    slug: project.slug,
    tag: project.tag || '',
    role: project.role || '',
    timeline: project.timeline || '',
    techStack: techList,
    images: Array.isArray(project.images) ? project.images : [],
    demoUrl: project.demoUrl || null,
    githubUrl: project.githubUrl || null,
    featured: Boolean(project.featured),
    isPublished: Boolean(project.isPublished),
    order: project.order || 0,
    translations: Array.isArray(project.translations)
      ? project.translations.map((t) => ({
          id: t.id,
          lang: t.lang,
          title: t.title || '',
          description: t.description || '',
          highlights: Array.isArray(t.highlights) ? t.highlights : [],
          content: t.content || null,
          metaTitle: t.metaTitle || null,
          metaDescription: t.metaDescription || null,
        }))
      : [],
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};

// Truy vấn danh sách dự án có phân trang, lọc tag, tìm kiếm và JOIN bảng Translation
export const findProjects = async ({ page = 1, limit = 6, tag, search, featured, isPublished = true, lang = 'vi' }) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.max(1, Math.min(50, Number(limit) || 6));
  const skip = (pageNum - 1) * limitNum;

  // Xây dựng điều kiện lọc WHERE
  const where = {
    ...(isPublished !== null && { isPublished: Boolean(isPublished) }),
    ...(featured !== undefined && { featured: Boolean(featured) }),
    ...(tag && tag !== 'Tất cả' && tag !== 'all' && { tag: String(tag).trim() }),
    ...(search && String(search).trim() && {
      translations: {
        some: {
          lang,
          OR: [
            { title: { contains: String(search).trim(), mode: 'insensitive' } },
            { description: { contains: String(search).trim(), mode: 'insensitive' } },
          ],
        },
      },
    }),
  };

  const [totalItems, projects] = await Promise.all([
    prisma.project.count({ where }),
    prisma.project.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        translations: {
          where: { lang },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalItems / limitNum) || 1;

  const formattedData = projects.map((p, idx) => {
    const globalIdx = (pageNum - 1) * limitNum + idx + 1;
    const indexStr = String(globalIdx).padStart(2, '0');
    return formatProjectFlat(p, lang, indexStr);
  });

  return {
    data: formattedData,
    pagination: {
      page: pageNum,
      limit: limitNum,
      totalItems,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};

// Truy vấn danh sách dự án cho Admin (lấy bao gồm cả tất cả các bản dịch)
export const findAdminProjects = async ({ page = 1, limit = 10, tag, search, isPublished, featured, lang = 'vi' }) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.max(1, Math.min(100, Number(limit) || 10));
  const skip = (pageNum - 1) * limitNum;

  const where = {
    ...(isPublished !== null && isPublished !== undefined && { isPublished: Boolean(isPublished) }),
    ...(featured !== undefined && { featured: Boolean(featured) }),
    ...(tag && tag !== 'all' && { tag: String(tag).trim() }),
    ...(search && String(search).trim() && {
      OR: [
        { slug: { contains: String(search).trim(), mode: 'insensitive' } },
        {
          translations: {
            some: {
              title: { contains: String(search).trim(), mode: 'insensitive' },
            },
          },
        },
      ],
    }),
  };

  const [totalItems, projects] = await Promise.all([
    prisma.project.count({ where }),
    prisma.project.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        translations: true, // Lấy toàn bộ các bản dịch
      },
    }),
  ]);

  const totalPages = Math.ceil(totalItems / limitNum) || 1;

  const formattedData = projects.map((p, idx) => {
    const globalIdx = (pageNum - 1) * limitNum + idx + 1;
    const indexStr = String(globalIdx).padStart(2, '0');
    return formatProjectFlat(p, lang, indexStr);
  });

  return {
    data: formattedData,
    pagination: {
      page: pageNum,
      limit: limitNum,
      totalItems,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};

// Truy vấn chi tiết một dự án theo slug và JOIN bảng Translation
export const findProjectBySlug = async (slug, lang = 'vi') => {
  if (!slug || typeof slug !== 'string' || !slug.trim()) return null;

  const project = await prisma.project.findUnique({
    where: { slug: slug.trim() },
    include: {
      translations: true, // Lấy tất cả bản dịch để fallback nếu cần
    },
  });

  if (!project) return null;
  return formatProjectFlat(project, lang, '01');
};

// Truy vấn chi tiết thô dự án theo ID cho Admin CMS (chứa tất cả các bản dịch)
export const findProjectByIdForAdmin = async (id) => {
  const numId = Number(id);
  if (!numId || isNaN(numId) || numId <= 0) return null;

  const project = await prisma.project.findUnique({
    where: { id: numId },
    include: {
      translations: true,
    },
  });

  if (!project) return null;
  return formatProjectRawForAdmin(project);
};

// Tạo mới dự án kèm danh sách bản dịch (Admin)
export const createProject = async ({ translations, ...projectData }) => {
  const newProject = await prisma.project.create({
    data: {
      ...projectData,
      ...(translations && Array.isArray(translations) && translations.length > 0 && {
        translations: {
          create: translations.map((t) => ({
            lang: t.lang || 'vi',
            title: t.title || '',
            description: t.description || '',
            highlights: Array.isArray(t.highlights) ? t.highlights : [],
            content: t.content || null,
            metaTitle: t.metaTitle || null,
            metaDescription: t.metaDescription || null,
          })),
        },
      }),
    },
    include: {
      translations: true,
    },
  });

  return formatProjectRawForAdmin(newProject);
};

// Cập nhật thông tin dự án theo ID (Admin)
export const updateProject = async (id, { translations, ...projectData }) => {
  const numId = Number(id);

  // 1. Cập nhật bảng Project chính
  const updatedProject = await prisma.project.update({
    where: { id: numId },
    data: projectData,
    include: { translations: true },
  });

  // 2. Cập nhật hoặc chèn mới các bản dịch vào bảng Translation dùng chung
  if (translations && Array.isArray(translations) && translations.length > 0) {
    for (const t of translations) {
      await prisma.translation.upsert({
        where: {
          projectId_lang: {
            projectId: numId,
            lang: t.lang || 'vi',
          },
        },
        update: {
          title: t.title || '',
          description: t.description || '',
          highlights: Array.isArray(t.highlights) ? t.highlights : [],
          content: t.content || null,
          metaTitle: t.metaTitle || null,
          metaDescription: t.metaDescription || null,
        },
        create: {
          projectId: numId,
          lang: t.lang || 'vi',
          title: t.title || '',
          description: t.description || '',
          highlights: Array.isArray(t.highlights) ? t.highlights : [],
          content: t.content || null,
          metaTitle: t.metaTitle || null,
          metaDescription: t.metaDescription || null,
        },
      });
    }
  }

  // Refetch dữ liệu mới nhất kèm các bản dịch
  const finalProject = await prisma.project.findUnique({
    where: { id: numId },
    include: { translations: true },
  });

  return formatProjectRawForAdmin(finalProject);
};

// Xóa dự án theo ID (Admin)
export const deleteProject = async (id) => {
  const deleted = await prisma.project.delete({
    where: { id: Number(id) },
  });
  return deleted;
};
