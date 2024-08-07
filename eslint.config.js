// @ts-check
import eslint from '@eslint/js';
import eslintPluginN from 'eslint-plugin-n';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginPromise from 'eslint-plugin-promise';
import pluginReact from 'eslint-plugin-react';
// import reactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

// @TODO: add eslint-plugin-testing-library

export default typescriptEslint.config(
  // Ignore shadcn/ui components, build and dist folders
  {
    ignores: ['**/components/ui/**/*', '**/{build,dist}/**/*'],
  },

  // Default eslint config
  eslint.configs.recommended,
  {
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

  // Typescript configs - by default it is parser and rules
  ...typescriptEslint.configs.recommendedTypeChecked,

  // Promises config
  eslintPluginPromise.configs['flat/recommended'],

  // Custom React, Typescript config
  {
    plugins: {
      react: pluginReact,
      // @FIXME: enable when support for eslint 9 is added - https://github.com/facebook/react/pull/28773
      // 'react-hooks': reactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },

    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
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
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',

      // React refresh
      'react-refresh/only-export-components': 'error',

      // React hooks
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
      // 'react/jsx-uses-react': 'error',
      // 'react/jsx-uses-vars': 'error',
    },
  },

  // NodeJS configs - enable when support for typescript is added
  {
    files: ['./apps/api/**/*.ts'],
    ...eslintPluginN.configs['flat/recommended-module'],
  },
  {
    files: ['./apps/api/**/*.ts'],

    rules: {
      'n/exports-style': ['error', 'module.exports'],
    },
  },

  // Default Prettier config
  pluginPrettier,
);
