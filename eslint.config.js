// @ts-check
import vueEslintParser from 'vue-eslint-parser';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

/**
 * Add later when eslint-plugin-promise starts supporting flat file config
 * import eslintPluginPromise from "eslint-plugin-promise";
 */
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// import eslintPluginN from 'eslint-plugin-n';
import typescriptEslint from 'typescript-eslint';
import WebAppEslintAutoImport from './config/eslintrc-auto-import.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @ts-ignore
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

const sharedRules = {
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
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Default eslint config
  {
    ...eslint.configs.recommended,
    files: ['apps/*/**/*.ts', 'packages/*/**/*.ts'],
  },

  // Default Typescript configs - by default it's parser and rules
  ...typescriptEslint.configs.recommended.map((conf) => ({ ...conf, files: ['**/.*ts'] })),

  // Env configs
  {
    files: ['**/*.ts', '**/*.vue'],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  // Ignore node modules and other directories
  {
    ignores: ['!node_modules/', 'node_modules/*'],
  },

  // Custom Typescript config
  {
    files: ['apps/*/**/*.ts', 'packages/*/**/*.ts'],

    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
    },

    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      ...sharedRules,
    },
  },

  // Vue config
  // @FIXME: replace this when eslint-plugin-vue receive flat config file support
  ...compat.extends('plugin:vue/vue3-strongly-recommended').map((config) => ({
    ...config,

    files: ['**/*.vue'],

    plugins: {
      vue: eslintPluginVue,
      '@typescript-eslint': typescriptEslint.plugin,
    },

    languageOptions: {
      globals: {
        // @ts-ignore
        ...(config?.languageOptions?.globals || {}),
        ...(typeof WebAppEslintAutoImport === 'object' ? WebAppEslintAutoImport?.globals : {}),
      },
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslint.parser,
        project: ['./tsconfig.eslint.json', './apps/web/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
      // @ts-ignore
      ecmaVersion: config?.languageOptions?.ecmaVersion || 'latest',
      // @ts-ignore
      sourceType: config?.languageOptions?.sourceType || 'module',
    },

    rules: {
      // @ts-ignore
      ...(config?.rules ? config?.rules : {}),
      ...sharedRules,
    },
  })),

  // Default Prettier config
  eslintConfigPrettier,
];
