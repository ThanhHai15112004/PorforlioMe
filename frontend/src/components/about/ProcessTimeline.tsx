import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLang, pick } from '../../lib/i18n';

const STEPS = [
  {
    num: '01',
    title: { vi: 'Hiểu vấn đề', en: 'Understand the problem' },
    desc: {
      vi: 'Phân tích nhu cầu, người dùng, quy trình hiện tại và mục tiêu thực tế của hệ thống.',
      en: 'Analyze needs, users, current workflow, and the real goals of the system.',
    },
    icon: 'mdi:magnify',
  },
  {
    num: '02',
    title: { vi: 'Thiết kế giải pháp', en: 'Design the solution' },
    desc: {
      vi: 'Xác định kiến trúc, phạm vi chức năng, luồng dữ liệu và những rủi ro có thể xảy ra.',
      en: 'Define architecture, feature scope, data flow, and potential risks.',
    },
    icon: 'mdi:map-marker-path',
  },
  {
    num: '03',
    title: { vi: 'Xây dựng', en: 'Build' },
    desc: {
      vi: 'Triển khai từng phần theo phạm vi rõ ràng, ưu tiên tính ổn định và khả năng bảo trì.',
      en: 'Implement piece by piece within a clear scope, prioritizing stability and maintainability.',
    },
    icon: 'mdi:cog-outline',
  },
  {
    num: '04',
    title: { vi: 'Kiểm thử', en: 'Test' },
    desc: {
      vi: 'Kiểm tra luồng nghiệp vụ, lỗi biên, hiệu suất và ảnh hưởng đến các module liên quan.',
      en: 'Verify business flows, edge cases, performance, and impact on related modules.',
    },
    icon: 'mdi:check-circle-outline',
  },
  {
    num: '05',
    title: { vi: 'Vận hành & tối ưu', en: 'Operate & optimize' },
    desc: {
      vi: 'Theo dõi hệ thống, xử lý điểm nghẽn và cải thiện dựa trên dữ liệu sử dụng thực tế.',
      en: 'Monitor the system, resolve bottlenecks, and improve based on real usage data.',
    },
    icon: 'mdi:trending-up',
  },
];

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang } = useLang();

  return (
    <div ref={ref}>
      {/* Desktop: horizontal */}
      <div className="hidden lg:block relative">
        {/* Track line */}
        <div className="absolute top-7 left-0 right-0 h-px bg-slate-200 dark:bg-white/10">
          <motion.div
            className="h-full bg-blue-600 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-5 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              {/* Node dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 300 }}
                className="relative z-10 w-14 h-14 rounded-full bg-white dark:bg-white/[0.03] border-2 border-blue-600 flex items-center justify-center shadow-md shadow-blue-100 dark:shadow-blue-950/30 mb-5"
              >
                <Icon icon={step.icon} className="text-xl text-blue-600 dark:text-blue-400" />
              </motion.div>

              {/* Number */}
              <span className="font-black text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">{step.num}</span>
              {/* Title */}
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                {pick(lang, step.title.vi, step.title.en)}
              </h4>
              {/* Desc */}
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{pick(lang, step.desc.vi, step.desc.en)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: vertical */}
      <div className="lg:hidden flex flex-col gap-0">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            className="flex gap-4"
          >
            {/* Left: node + line */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-white/[0.03] border-2 border-blue-600 flex items-center justify-center shadow-sm shadow-blue-100 dark:shadow-blue-950/30 shrink-0 z-10">
                <Icon icon={step.icon} className="text-lg text-blue-600 dark:text-blue-400" />
              </div>
              {i < STEPS.length - 1 && (
                <motion.div
                  className="w-px flex-1 bg-blue-200 dark:bg-blue-500/20 my-1"
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                />
              )}
            </div>

            {/* Right: content */}
            <div className="pb-8">
              <span className="font-black text-xs font-mono text-blue-600 dark:text-blue-400">{step.num}</span>
              <h4 className="font-bold text-slate-900 dark:text-white mt-0.5 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {pick(lang, step.title.vi, step.title.en)}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{pick(lang, step.desc.vi, step.desc.en)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
