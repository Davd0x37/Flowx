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
    '(c|sc)ss$',
    '^[./].*(?<!\\.(c|sc)ss)$',
    '^dotenv(.*)$',
    '^react(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@flowx/(.*)$',
    '^app/(.*)$',
    '^features/(.*)$',
    '^ui/(.*)$',
  ],
  importOrderSeparation: false, //true,
  importOrderSortSpecifiers: true,
};
