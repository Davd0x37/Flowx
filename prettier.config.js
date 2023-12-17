/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '^dotenv(.*)$',
    '^react(.*)$',
    '^vue(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@flowx/(.*)$',
    '^app/(.*)$',
    '^features/(.*)$',
    '^[./].*(?<!\\.(c|sc)ss)$',
    '(c|sc)ss$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
