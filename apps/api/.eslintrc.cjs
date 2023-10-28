module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-unused-vars': 'off', '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_',
    },],
  },
  ignorePatterns: ['node_modules', '.eslintrc.cjs'],
};
