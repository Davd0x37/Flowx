import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';

import tailwindConfig from './tailwind.config';

import tailwind from 'tailwindcss';

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer, postcssNested, postcssPresetEnv],
};
