// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
// import reactHookes from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import typescriptEslint from 'typescript-eslint';

/**
 * Add later when eslint-plugin-promise starts supporting flat file config
 * import eslintPluginPromise from "eslint-plugin-promise";
 *
 * import eslintPluginN from 'eslint-plugin-n';
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @ts-ignore
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  // Default eslint config
  {
    ...eslint.configs.recommended,
    files: ['**/*.ts'],
  },

  // Typescript configs - by default it's parser and rules
  ...typescriptEslint.configs.recommended.map((conf) => ({ ...conf, files: ['**/.*ts'] })),

  // Ignore node modules and other directories
  {
    ignores: ['!node_modules/', 'node_modules/*'],
  },

  // Env configs
  {
    files: ['**/*.{ts,tsx}'],

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
      // 'react-refresh': reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 'react-refresh/only-export-components': 'warn',
      // 'react/jsx-uses-react': 'error',
      // 'react/jsx-uses-vars': 'error',
    },
  },

  // @TODO: update to flat file config version when released - https://github.com/facebook/react/issues/28313#issuecomment-2041122978
  // ...compat.extends('plugin:react-hooks/recommended').map((conf) => ({
  //   ...conf,
  //   files: ['apps/web/**/*.tsx'],
  // })),

  // Default Prettier config
  { ...pluginPrettier },
];
