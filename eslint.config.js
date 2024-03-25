// @ts-check
import vueEslintParser from 'vue-eslint-parser';
import eslint from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

// const WebAppEslintAutoImport = JSON.parse(readFileSync(resolve('./apps/web/eslintrc-auto-import.json'), 'utf-8'));

/**
 * Add later when eslint-plugin-promise starts supporting flat file config
 * import eslintPluginPromise from "eslint-plugin-promise";
 *
 * import eslintPluginN from 'eslint-plugin-n';
 */

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
    files: ['**/*.{ts,vue}'],

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

  // Env configs for Web app - used with unplugin-import
  {
    files: ['apps/web/**/*.ts'],

    languageOptions: {
      globals: {
        ...globals.browser,
        // ...(typeof WebAppEslintAutoImport === 'object' ? WebAppEslintAutoImport?.globals : {}),
      },
    },
  },

  // Vue config
  ...eslintPluginVue.configs['flat/strongly-recommended'],
  {
    files: ['**/*.vue'],

    plugins: {
      // vue: eslintPluginVue,
      '@typescript-eslint': typescriptEslint.plugin,
    },

    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslint.parser,
        project: ['./tsconfig.eslint.json', './apps/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },

    rules: {
      ...sharedRules,
    },
  },

  // Default Prettier config
  { ...eslintPluginPrettier },
];
