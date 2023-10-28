module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off', '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_',
    },],
  },
  ignorePatterns: ['node_modules', '.eslintrc.cjs'],
};
