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
    '^vue(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@flowx/(.*)$',
    '^app/(.*)$',
    '^[./].*(?<!\\.(c|sc)ss)$',
    '(c|sc)ss$',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
