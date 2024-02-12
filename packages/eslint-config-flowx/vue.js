module.exports = {
  env: {
    browser: true,
    node: true,
  },

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['@typescript-eslint'],

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },

  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules', '.eslintrc'],

  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
  },
};
