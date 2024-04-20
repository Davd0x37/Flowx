// @ts-check
import eslint from '@eslint/js';
// import eslintPluginN from 'eslint-plugin-n';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
// import reactHookes from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  // Default eslint config
  {
    ...eslint.configs.recommended,

    files: ['**/*.{ts,tsx}'],

    // Env configs
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        RequestInfo: true,
        RequestInit: true,
        BufferSource: true,
      },
    },
  },

  // Typescript configs - by default it's parser and rules
  ...typescriptEslint.configs.recommended.map((conf) => ({ ...conf, files: ['**/.*ts'] })),

  // Ignore node modules and other directories
  {
    ignores: ['!node_modules/', 'node_modules/*'],
  },

  // Custom Typescript config
  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
    },

    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json', './*/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

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
  },

  // React configs
  {
    files: ['**/*.tsx'],
    plugins: {
      react: pluginReact,
      // @FIXME: enable when support for eslint 9 is added - https://github.com/facebook/react/pull/28773
      // 'react-hooks': reactHookes,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
      // 'react/jsx-uses-react': 'error',
      // 'react/jsx-uses-vars': 'error',
    },
  },

  // NodeJS configs - enable when support for typescript is added
  // {
  //   files: ['apps/api/**/*.ts'],
  //   ...eslintPluginN.configs['flat/recommended-module'],
  // },
  // {
  //   files: ['apps/api/**/*.ts'],

  //   rules: {
  //     'n/exports-style': ['error', 'module.exports'],
  //   },
  // },

  // Default Prettier config
  pluginPrettier,
];
