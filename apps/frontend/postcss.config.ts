import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'
import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config'

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    autoprefixer(),
    postcssNested(),
    postcssPresetEnv(),
    tailwind({
      config: tailwindConfig,
    }),
  ],
}
