/**
 * Design System Tokens
 * This file stores the theme configuration including color palettes and typography styles.
 * Use these constants to maintain visual consistency across components, Canvas rendering, and styles.
 */

export const COLORS = {
  // Background colors
  bg: {
    main: '#050505',
    soft: '#0B0B0D',
    card: '#111113',
    cardHover: '#18181B',
  },

  // Typography colors
  text: {
    main: '#F5F5F5',
    soft: '#A1A1AA',
    muted: '#71717A',
  },

  // Borders
  border: {
    soft: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.22)',
  },

  // Accent colors
  accent: {
    main: '#22C55E',
    blue: '#38BDF8',
    red: '#9F1239',
    purple: '#A855F7',
  },

  // Glow / Box Shadow colors
  glow: {
    green: 'rgba(34, 197, 94, 0.35)',
    blue: 'rgba(56, 189, 248, 0.35)',
    red: 'rgba(159, 18, 57, 0.32)',
  },
} as const;

export const FONTS = {
  heading: "'Space Grotesk', 'Sora', sans-serif",
  body: "'Inter', 'Plus Jakarta Sans', sans-serif",
  code: "'JetBrains Mono', monospace",
} as const;

export const TYPOGRAPHY = {
  heroTitle: {
    fontSize: 'clamp(64px, 11vw, 160px)',
    lineHeight: '0.86',
    letterSpacing: '-0.07em',
    fontWeight: '800',
    fontFamily: FONTS.heading,
  },
  sectionTitle: {
    fontSize: 'clamp(38px, 6vw, 88px)',
    lineHeight: '0.95',
    letterSpacing: '-0.05em',
    fontFamily: FONTS.heading,
  },
  body: {
    fontSize: '16px',
    lineHeight: '1.7',
    fontFamily: FONTS.body,
    color: COLORS.text.soft,
  },
} as const;

export type ThemeColors = typeof COLORS;
export type ThemeFonts = typeof FONTS;
export type ThemeTypography = typeof TYPOGRAPHY;
