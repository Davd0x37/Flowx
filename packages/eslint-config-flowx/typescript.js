module.exports = {
  env: {
    browser: true,
    node: true,
  },

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },

  overrides: [
    {
      files: ['*.graphql'],
      extends: 'plugin:@graphql-eslint/schema-recommended',
      rules: {
        '@graphql-eslint/known-type-names': 'error',
      },
    },
  ],

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
    '@typescript-eslint/method-signature-style': ['error', 'property'],
  },
};
