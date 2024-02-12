module.exports = {
  root: true,
  extends: ['@flowx/eslint-config-flowx'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc', 'tsconfig.json'],
};
