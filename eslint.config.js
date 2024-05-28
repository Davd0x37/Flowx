// @ts-check
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintPluginN from 'eslint-plugin-n';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const compat = new FlatCompat();

// @TODO: add eslint-plugin-testing-library

export default typescriptEslint.config(
  // Ignore shadcn/ui components
  {
    ignores: ['**/components/ui/**/*'],
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

  // @ts-expect-error fix when eslint v9 will be supported
  ...fixupConfigRules(compat.config({ extends: ['plugin:promise/recommended'] })),

  // Custom React, Typescript config
  {
    plugins: {
      react: pluginReact,
      // @FIXME: enable when support for eslint 9 is added - https://github.com/facebook/react/pull/28773
      'react-hooks': reactHooks,
    },

    languageOptions: {
      parserOptions: {
        project: ['./{packages,apps}/*/tsconfig*.json'],
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
