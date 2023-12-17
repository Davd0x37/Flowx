import tailwindForms from '@tailwindcss/forms';
import tailwindTypography from '@tailwindcss/typography';
import DaisyUI from 'daisyui';

const APP_COLORS = {
  primary: '#8dbe7e',
  secondary: '#1062ae',
  accent: '#d8e9d3',
  neutral: '#365a68',
  'base-100': '#1d232a',
  info: '#5ca6c4',
  success: '#3a986c',
  warning: '#f4c152',
  error: '#f44336',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: '350px 1fr',
        header: '150px minmax(auto, 1fr) 150px',
      },
    },
  },
  plugins: [tailwindTypography, tailwindForms, DaisyUI],
  daisyui: {
    themes: [
      {
        mainTheme: APP_COLORS,
      },
      'light',
      'night',
    ],
    darkTheme: 'mainTheme',
  },
};
