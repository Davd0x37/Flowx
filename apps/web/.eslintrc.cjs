module.exports = {
  root: true,
  extends: ['@flowx/eslint-config-flowx/vue'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc', 'tsconfig.json'],
};
