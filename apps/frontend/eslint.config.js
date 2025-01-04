import nx from '@nx/eslint-plugin'
import baseConfig from '../../eslint.config.js'

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    // Ignore ui components
    ignores: ['**/ui'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
]
