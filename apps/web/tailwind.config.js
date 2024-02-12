import tailwindForms from '@tailwindcss/forms';
import tailwindTypography from '@tailwindcss/typography';
import DaisyUI from 'daisyui';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const { cyan, green, lime, orange, red, sky, slate, teal } = colors;
const { fontFamily } = defaultTheme;

const COLORS = {
  primary: {
    ...green,
    DEFAULT: green[500],
  },
  secondary: {
    ...cyan,
    DEFAULT: cyan[700],
  },
  accent: {
    ...teal,
    DEFAULT: teal[500],
  },
  neutral: {
    ...slate,
    DEFAULT: slate[800],
  },
};

const THEME_COLORS = {
  primary: COLORS.primary.DEFAULT,
  secondary: COLORS.secondary.DEFAULT,
  accent: COLORS.accent.DEFAULT,
  neutral: COLORS.neutral.DEFAULT,
  'base-100': slate[900],
  info: sky[400],
  success: lime[300],
  warning: orange[500],
  error: red[700],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Rethink Sans"', ...fontFamily.sans],
      },
      colors: COLORS,
    },
  },
  plugins: [tailwindTypography, tailwindForms, DaisyUI],
  daisyui: {
    themes: [
      {
        mainTheme: THEME_COLORS,
      },
      'light',
      'night',
    ],
    darkTheme: 'light',
  },
};
