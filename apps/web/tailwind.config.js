import tailwindForms from '@tailwindcss/forms';
import tailwindTypography from '@tailwindcss/typography';
import daisyUI from 'daisyui';

const APP_COLORS = {
  secondary: '#8dbe7e',
  primary: '#1062ae',
  accent: '#d8e9d3',
  // neutral: '#365a68',
  'base-100': '#1d232a',
  info: '#5ca6c4',
  success: '#3a986c',
  warning: '#b78834',
  error: '#f44336',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ...APP_COLORS,
      },
      gridTemplateColumns: {
        app: '350px 1fr',
        header: '150px minmax(auto, 1fr) 150px',
      },
    },
  },
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         ...APP_COLORS,
  //       },
  //     },
  //   ],
  // },
  plugins: [/* daisyUI,  */ tailwindTypography, tailwindForms],
};
