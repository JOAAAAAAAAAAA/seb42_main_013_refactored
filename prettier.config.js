// @ts-check
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  pluginSearchDirs: false,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'],
  importOrder: ['^@', '^[a-zA-Z0-9-]+', '^[./]'],
  tailwindConfig: './tailwind.config.js',
}