import type { Variants } from 'framer-motion';

/** Cubic ease-out-ish curve used for every entrance/reveal animation on the site. */
export const easeOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Shared fade-up entrance variant, driven by a `custom` delay per element. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: easeOut },
  }),
};

/** Standard viewport config for `whileInView` scroll reveals — play once, trigger slightly early. */
export const revealViewport = { once: true, margin: '-100px' };
