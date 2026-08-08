import { useEffect, useRef } from 'react';

/**
 * Quầng sáng mềm bám theo con trỏ chuột, tạo chiều sâu cho nền.
 * Cập nhật qua CSS variable + requestAnimationFrame, không dùng React state
 * nên không gây re-render — an toàn về hiệu năng.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;

    function apply() {
      ref.current?.style.setProperty('--glow-x', `${x}px`);
      ref.current?.style.setProperty('--glow-y', `${y}px`);
      frame = 0;
    }

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      style={{
        background:
          'radial-gradient(560px circle at var(--glow-x, 50%) var(--glow-y, 30%), rgba(37,99,235,0.08), transparent 70%)',
      }}
    />
  );
}
