/**
 * Design System Tokens
 * This file stores the theme configuration including color palettes and typography styles.
 * Use these constants to maintain visual consistency across components, Canvas rendering, and styles.
 */

export const COLORS = {
  // Background colors
  bg: {
    main: '#FFFFFF',
    soft: '#FAFAFA',
    card: '#FFFFFF',
    cardHover: '#F8FAFC',
  },

  // Typography colors
  text: {
    main: '#0F172A', // Slate 900
    soft: '#475569', // Slate 600
    muted: '#94A3B8', // Slate 400
  },

  // Borders
  border: {
    soft: 'rgba(0, 0, 0, 0.06)',
    strong: 'rgba(0, 0, 0, 0.12)',
  },

  // Accent colors (Blue Primary)
  primary: {
    main: '#2563EB', // Blue 600
    hover: '#1D4ED8', // Blue 700
    light: '#EFF6FF', // Blue 50
  },

  // Glow / Box Shadow colors
  glow: {
    blue: 'rgba(37, 99, 235, 0.15)',
    soft: 'rgba(0, 0, 0, 0.04)',
  },
} as const;

export const FONTS = {
  heading: "'Inter', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  code: "'Inter', system-ui, sans-serif",
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
